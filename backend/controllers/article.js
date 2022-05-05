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
    include:[{model: User}]
  })
    .then((article) => res.status(200).json(article))
    .catch((error) => res.status(404).json({ error }));
}
  
exports.getAllArticles = (req, res, next) => {
  where = {};
  if(req.query.type == "text"){
    where = {
      where: {
        content: {[Op.not]: null || ""}
      },
      include:[
        {model: User},
        {model: Comments}
      ],
      order: [["createdAt" , "DESC"]]
    }
  }
  if(req.query.type == "image"){
    where = {
      where: {
        imageUrl: {[Op.not]: ""}
      },
      include:[
        {model: User},
        {model: Comments}
      ],
      order: [["createdAt" , "DESC"]]
    }
  }
  Article.findAll(where)
    .then((articles) => res.status(200).json(articles))
    .catch((error) => res.status(400).json({ error }));
}

exports.modifyArticle = (req, res, next) => {
  console.log(req.body)
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
      else if (article.users_id !== req.auth.userId) {
        res.status(403).json({
          error: new Error('Unauthorized request !')
        });
      }
      if(article.imageUrl != null){
        console.log(req.file)
        const filename = article.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Article.update({ ...articleObject, id:  req.params.id},{where: {id: req.params.id}})
            .then(() => res.status(200).json({ message: 'Article modifié !'}))
            .catch(error => res.status(400).json({ error }));
        })
      }
      else {
        console.log(req.body.content)
        Article.update({ ...articleObject, id:  req.params.id},{where: {id: req.params.id}})
          .then(() => res.status(200).json({ message: 'Article modifié !'}))
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
    else if (article.users_id !== req.auth.userId) {
      res.status(403).json({
        error: new Error('Unauthorized request !')
      })
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