const Article = require('../models/articleSchema');
const User = require('../models/userSchema');
const Comments = require('../models/commentSchema');

const Op = require("sequelize").Op;
const fs = require('fs');

exports.createArticle = (req, res, next) => {
  console.log(req.body)
  const content = req.body.content;
  const users_id = req.auth.userId;
  const articleObject = req.body;
  if((content == null || content == "") && (!req.file)){
    return res.status(400).json(res.status);
  }
  else if(req.file) {
    const article = {...articleObject, imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`, users_id};
    const post = new Article({
      ...article})
    post.save(({ where: {id: req.params.id}}))
      .then((article) => res.status(201).json(article))
      .catch(error => res.status(400).json({ error }));
  }
  else {
    const article = { ...articleObject, users_id};
    const post = new Article({
      ...article})
    post.save()
      .then(() => res.status(201).json(article))
      .catch(error => res.status(400).json({ error }));
  }
}
    
exports.getOneArticle = (req, res, next) => {
  Article.findOne({ 
    where:{id: req.params.id},
    include:[{model: User, attributes: ['firstName', 'lastName', 'id', 'job', 'imageUrl']}, {model: Comments}]
  })
    .then((article) => res.status(200).json(article))
    .catch((error) => res.status(404).json({ error }));
}
  
exports.getAllArticles = (req, res, next) => {
if(req.query.isAdmin){
  where = {
    include:[
      {model: User, attributes: ['firstName', 'lastName', 'id', 'job', 'imageUrl']},
      {model: Comments, attributes : ['text', 'visible']}
    ],
    order: [["createdAt" , "DESC"]],
  }
}
else {
  const size = JSON.parse(req.query.size);
  const page = JSON.parse(req.query.page);
  where = {};
  if(req.query.type == "text"){
    where = {
      where: {
        content: {[Op.not]: null || ""}, visible: true
      },
      include:[
        {model: User, attributes: ['firstName', 'lastName', 'id', 'job', 'imageUrl']},
        {model: Comments, include: [{model: User}], limit : 2, where : {visible : true}, order: [["createdAt" , "DESC"]]}
    ],
      order: [["createdAt" , "DESC"]],
      limit : size,
      offset : page * size,
    }
  }
  if(req.query.type == "image"){
    where = {
      where: {
        imageUrl: {[Op.not]: null || ""}, visible: true
      },
      include:[
        {model: User, attributes: ['firstName', 'lastName', 'id', 'job', 'imageUrl']},
        {model: Comments, include: [{model: User}], limit : 2,  where : {visible : true}, order: [["createdAt" , "DESC"]]}
      ],
      order: [["createdAt" , "DESC"]],
      limit : size,
      offset : page * size,
    }
  }
}
Article.findAndCountAll(where)
  .then((articles) => res.status(200).json({articles, totalPages : Math.ceil(articles.count / 5) }))
  .catch((error) => res.status(400).json({ error }));
}

exports.modifyArticle = (req, res, next) => {
  const articleObject = req.file ?
  {
    ...req.body,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };

  Article.findOne({ where: {id: req.params.id}})
    .then(article => {
      if (!article) {
        res.status(404).json({error: new Error('No such Thing!')});
      }
      if(article.imageUrl != null){
        const filename = article.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Article.update({ ...articleObject, id:  req.params.id},{where: {id: req.params.id}})
            .then((article) => res.status(200).json({ article}))
            .catch(error => res.status(400).json({ error }));
        })
      }
      else {
        Article.update({ ...articleObject, id:  req.params.id},{where: {id: req.params.id}})
          .then((article) => res.status(200).json({article}))
          .catch(error => res.status(400).json({ error }));
      }
    })
    .catch(error => res.status(500).json({ error }));
  };

exports.deleteArticle = (req, res, next) => {
  Article.findOne({ where: {id: req.params.id}})
  .then(article => {
    if (!article) {
      res.status(404).json({error: new Error('No such Thing!')});
    }
    if(article.imageUrl != null){
    const filename = article.imageUrl.split('/images/')[1];
    fs.unlink(`images/${filename}`, () => {
      Article.destroy({ where: {id: req.params.id} })
        .then((article) => res.status(204).json(article.id))
        .catch(error => res.status(400).json({ error }));
      })
    }
    else {
      Article.destroy({ where: {id: req.params.id} })
        .then((article) => res.status(204).json(article.id))
        .catch(error => res.status(400).json({ error }));
      }
    })
  .catch(error => res.status(500).json({ error }));
};

exports.likeArticle = (req, res, next) => {
  Article.findOne({ where: {id: req.params.id} })
  .then((article) => {
    let likes = article.likes;
    let usersLiked = article.usersLiked;
    let userId = req.body.userIdLike;
    if (usersLiked) {
      const found = usersLiked.find(p => p == userId);
      if (found) {
        likes--;
        let userKey = usersLiked.indexOf(userId);
        usersLiked.splice(userKey, 1);
      }
      else{
        likes++;
        usersLiked.push(req.body.userIdLike);
      }
      articleObject = {...article, likes, usersLiked}
    }
    else {
      usersLiked = [];
      likes++;
      usersLiked.push(req.body.userIdLike);
      articleObject = {...article, likes, usersLiked}
  }
    Article.update({ ...articleObject, id: req.params.id},{where: {id: req.params.id}})
      .then(() => {res.status(200).json({likes, usersLiked})})
      .catch((error) => {res.status(400).json({ error })});
})
  .catch((error) => {res.status(404).json({ error })});
}