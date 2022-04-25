const Article = require('../models/articleSchema');
const User = require('../models/userSchema');
const Op = require("sequelize").Op;

const fs = require('fs');

exports.createArticle = (req, res, next) => {
  const articleObject = req.body;
  const users_id = req.auth.userId;
  const article = req.file ? {
     ...articleObject,imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`, users_id} : { ...req.body, users_id};
     const post = new Article({
      ...article})

      if((post.content == null || post.content == "") && (post.imageUrl == null || post.imageUrl == "")){
        return res.status(400).json({'error': "Veuillez remplir le champ 'texte' ou 'image' pour créer un article"});
      }
      else if (post.content != null && post.imageUrl != null) {
        return res.status(400).json({'error': "Veuillez ne remplir qu'un seul des champs 'texte' ou 'image' pour créer un article"});
      }
  
      post.save()
          .then(() => res.status(201).json(article))
          .catch(error => res.status(400).json({ error }));
    }
    

exports.getOneArticle = (req, res, next) => {
    Article.findOne({ 
      where:{
        id: req.params.id 
      },
      include:[
        {
          model: User
        }
      ]
    })
        .then((article) => res.status(200).json(article))
        .catch((error) => res.status(404).json({ error }));
    };
  
  exports.getAllArticles = (req, res, next) => {
    where = {};
    if(req.query.type == "text"){
      where = {
        where: {
          content: {
            [Op.not]: null
          }
        },
        include:[
          {
            model: User
          }
        ]
      }
    }
    if(req.query.type == "image"){
      where = {
        where: {
          imageUrl: {
            [Op.not]: ""
          }
        },
        include:[
          {
            model: User
          }
        ]
      }
    }
      Article.findAll(where)
          .then((articles) => res.status(200).json(articles))
          .catch((error) => res.status(400).json({ error }));
      };

exports.modifyArticle = (req, res, next) => {
  const articleObject = req.file ?
  {
    ...JSON.parse(req.body.article),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };
  Article.findOne({ where: {id: req.params.id} })
    .then(article => {
      if (!article) {
        res.status(404).json({error: new Error('No such Thing!')});
      }
      else if (article.users_id !== req.auth.userId) {
        res.status(403).json({
          error: new Error('Unauthorized request !')
        })
      }
    const filename = article.imageUrl.split('/images/')[1];
    fs.unlink(`images/${filename}`, () => {
      Article.update({ ...articleObject, id:  req.params.id}, { where: {id: req.params.id} })
        .then(() => res.status(200).json({ message: 'Article modifié !'}))
        .catch(error => res.status(400).json({ error }));
      })
    })
    .catch(error => res.status(500).json({ error }));
  };

exports.deleteArticle = (req, res, next) => {
  Article.findOne({ where: {id: req.params.id} })
  .then(article => {
    if (!article) {
      res.status(404).json({error: new Error('No such Thing!')});
    }
    else if (article.users_id !== req.auth.userId) {
      res.status(403).json({
        error: new Error('Unauthorized request !')
      })
    }
    const filename = article.imageUrl.split('/images/')[1];
    fs.unlink(`images/${filename}`, () => {
      Article.destroy({ where: {id: req.params.id} })
      .then(() => res.status(204))
      .catch(error => res.status(400).json({ error }));
    })
  })
  .catch(error => res.status(500).json({ error }));
};