const Article = require('../models/articleSchema');
const User = require('../models/userSchema');
const Comments = require('../models/commentSchema');

const Op = require("sequelize").Op;
const fs = require('fs');

exports.createArticle = (req, res, next) => {
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
        {model: Comments}
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
        {model: Comments}
      ],
      order: [["createdAt" , "DESC"]],
      limit : size,
      offset : page * size,
    }
  }
  if(req.query.type == "image"){
    where = {
      where: {
        imageUrl: {[Op.not]: ""}, visible: true
      },
      include:[
        {model: User, attributes: ['firstName', 'lastName', 'id', 'job', 'imageUrl']},
        {model: Comments}
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
        console.log("test2")
        const filename = article.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Article.update({ ...articleObject, id:  req.params.id},{where: {id: req.params.id}})
            .then((article) => res.status(200).json({ article}))
            .catch(error => res.status(400).json({ error }));
        })
      }
      else {
        console.log("test3")
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
        .then((article) => res.status(204).json(article))
        .catch(error => res.status(400).json({ error }));
      })
    }
    else {
      Article.destroy({ where: {id: req.params.id} })
        .then((article) => res.status(204).json(article))
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
    let userId = req.body.userId;
    let usersDisliked = article.usersDisliked;
    let dislikes = article.dislikes;
    
    if (usersLiked) {
      const found = usersLiked.find(p => p == userId);
      if (found) {
        likes--;
        let userKey = usersLiked.indexOf(userId);
        usersLiked.splice(userKey, 1);
        articleObject = {...article, likes, usersLiked}
      }
      else{
        if(usersDisliked) {
          const foundDislike = usersDisliked.find(p => p == userId);
          if(foundDislike) {
            let userKey = usersDisliked.indexOf(userId);
            usersDisliked.splice(userKey, 1);
            dislikes--;
            likes++;
            usersLiked.push(req.body.userId);
            articleObject = {...article, dislikes, usersDisliked, likes, usersLiked}
          }
          else {
            likes++;
            usersLiked.push(req.body.userId);
            articleObject = {...article, likes, usersLiked}
          }
        }
          else {
            likes++;
            usersLiked.push(req.body.userId);
            articleObject = {...article, likes, usersLiked}
          }
      }
    }
    else {
      usersLiked = [];
      if(usersDisliked){
        const foundDislike = usersDisliked.find(p => p == userId);
        if(foundDislike) {
          let userKey = usersDisliked.indexOf(userId);
          usersDisliked.splice(userKey, 1);
          dislikes--;
          likes++;
          usersLiked.push(req.body.userId);
          articleObject = {...article, dislikes, usersDisliked, likes, usersLiked};
        }
        else {
          likes++;
          usersLiked.push(req.body.userId);
          articleObject = {...article, likes, usersLiked}
        }
      }
      else {
        likes++;
        usersLiked.push(req.body.userId);
        articleObject = {...article, likes, usersLiked}
      }
  }
    Article.update({ ...articleObject, id: req.params.id},{where: {id: req.params.id}})
      .then(() => {res.status(200).json({dislikes, likes, usersDisliked, usersLiked})})
      .catch((error) => {res.status(400).json({ error })});
})
  .catch((error) => {res.status(404).json({ error })});
}

exports.dislikeArticle = (req, res, next) => {
  Article.findOne({ where: {id: req.params.id} })
  .then((article) => {
    let likes = article.likes;
    let usersLiked = article.usersLiked;
    let userId = req.body.userId;
    let usersDisliked = article.usersDisliked;
    let dislikes = article.dislikes;

    if (usersDisliked) {
      const found = usersDisliked.find(p => p == userId);
      if (found) {
        dislikes--;
        let userKey = usersDisliked.indexOf(userId);
        usersDisliked.splice(userKey, 1);
        articleObject = {...article, dislikes, usersDisliked}
      }
      else{
        if(usersLiked) {
          const foundLike = usersLiked.find(p => p == userId);
          if(foundLike) {
            let userKey = usersLiked.indexOf(userId);
            usersLiked.splice(userKey, 1);
            likes--;
            dislikes++;
            usersDisliked.push(req.body.userId);
            articleObject = {...article, dislikes, usersDisliked, likes, usersLiked}
          }
          else {
            dislikes++;
            usersDisliked.push(req.body.userId);
            articleObject = {...article, dislikes, usersDisliked}
          }
        }
          else {
            dislikes++;
            usersDisliked.push(req.body.userId);
            articleObject = {...article, dislikes, usersDisliked}
          }
      }
    }
    else {
      usersDisliked = [];
      if(usersLiked){
        const foundLike = usersLiked.find(p => p == userId);
        if(foundLike) {
          let userKey = usersLiked.indexOf(userId);
          usersLiked.splice(userKey, 1);
          likes--;
          dislikes++;
          usersDisliked.push(req.body.userId);
          articleObject = {...article, dislikes, usersLiked, likes, usersDisliked}
        }
        else {
          dislikes++;
          usersDisliked.push(req.body.userId);
          articleObject = {...article, dislikes, usersDisliked}
        }
      }
      else {
        dislikes++;
        usersDisliked.push(req.body.userId);
        articleObject = {...article, dislikes, usersDisliked}
    }
  }
    Article.update({ ...articleObject, id: req.params.id},{where: {id: req.params.id}})
      .then(() => {res.status(200).json({dislikes, likes, usersDisliked, usersLiked})})
      .catch((error) => {res.status(400).json({ error })});
})
  .catch((error) => {res.status(404).json({ error })});
}


