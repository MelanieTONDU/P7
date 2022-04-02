const Article = require('../models/articleSchema');
const User = require('../models/userSchema');

const fs = require('fs');

exports.createArticle = (req, res, next) => {
  const imageUrl = req.body.imageUrl;
  const content =  req.body.content;
  if((content == null || content == "") && (imageUrl == null || imageUrl == "")){
      return res.status(400).json({'error': "Veuillez remplir le champ 'texte' ou 'image' pour créer un article"});
  }
  else if (content != null && imageUrl != null) {
    return res.status(400).json({'error': "Veuillez ne remplir qu'un seul des champs 'texte' ou 'image' pour créer un article"});
  }
  const articleObject = req.body;
  const article = new Article({
          ...articleObject,})
  article.save()
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
      Article.findAll()
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
      Article.update({ ...articleObject, id:  req.params.id}, { where: {id: req.params.id} })
        .then(() => res.status(200).json({ message: 'Article modifié !'}))
        .catch(error => res.status(400).json({ error }));
      })
    .catch(error => res.status(500).json({ error }));
  };

exports.deleteArticle = (req, res, next) => {
  Article.findOne({ where: {id: req.params.id} })
  .then(article => {
    if (!article) {
      res.status(404).json({error: new Error('No such Thing!')});
    }
    Article.destroy({ where: {id: req.params.id} })
    .then(() => res.status(204))
    .catch(error => res.status(400).json({ error }));
  })
  .catch(error => res.status(500).json({ error }));
};