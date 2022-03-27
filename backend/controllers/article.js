const Article = require('../models/articleSchema');
const fs = require('fs');

exports.createArticle = (req, res, next) => {
    const title = req.body.title;
    const content =  req.body.content;
    if(title === null || title === '' || content === null || content === '') {
        return res.status(400).json({'error': "Veuillez remplir les champs 'titre' et 'contenu' pour créer un article"});
    }
    const articleObject = req.body;
    const article = new Article({
            ...articleObject});
    article.save()
        .then(() => res.status(201).json({ message: 'Article créé !'}))
        .catch(error => res.status(400).json({ error }));
}

exports.getOneArticle = (req, res, next) => {
    Article.findOne({ id: req.params.id })
        .then((article) => res.status(200).json(article))
        .catch((error) => res.status(404).json({ error }));
    };
  
  exports.getAllArticles = (req, res, next) => {
      Article.findAll()
          .then((articles) => res.status(200).json(articles))
          .catch((error) => res.status(400).json({ error }));
      };

exports.modifyArticle = (req, res, next) => {}

exports.deleteArticle = (req, res, next) => {
    Article.findOne({ where: {id: req.params.id} })
      .then(user => {
        if (!user) {
          res.status(404).json({
            error: new Error('No such Thing!')
          });
        }
        Article.destroy({ where: {id: req.params.id} })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch((error) => res.status(400).json({ error }));
      })
    .catch(error => res.status(400).json({ error }));
  };