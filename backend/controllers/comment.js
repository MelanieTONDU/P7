const Comment = require('../models/commentSchema');
const User = require('../models/userSchema');

exports.createComment = (req, res, next) => {
    const commentObject = req.body;
    const users_id = req.auth.userId;
    const url = req.originalUrl;
    const articles_id = url.split('/')[3];
    const comment = new Comment({
            ...commentObject, users_id, articles_id})
    comment.save()
        .then(() => res.status(201).json(comment))
        .catch(error => res.status(400).json({ error }));
      }
      
exports.modifyComment = (req, res, next) => {
    const commentObject = req.body;
  Comment.findOne({ where: {id: req.params.id} })
    .then(comment => {
      if (!comment) {
        res.status(404).json({error: new Error('No such Thing!')});
      }
      else if (comment.users_id !== req.auth.userId) {
        res.status(403).json({
          error: new Error('Unauthorized request !')
        })
      }
      Comment.update({ ...commentObject, id:  req.params.id}, { where: {id: req.params.id} })
        .then(() => res.status(200).json({ message: 'Commentaire modifié !'}))
        .catch(error => res.status(400).json({ error }));
      })
    .catch(error => res.status(500).json({ error }));
  };

exports.deleteComment = (req, res, next) => {
  Comment.findOne({ where: {id: req.params.id} })
  .then(comment => {
    if (!comment) {
      res.status(404).json({error: new Error('No such Thing!')});
    }
    else if (comment.users_id !== req.auth.userId) {
      res.status(403).json({
        error: new Error('Unauthorized request !')
      })
    }
    Comment.destroy({ where: {id: req.params.id} })
    .then(() => res.status(204))
    .catch(error => res.status(400).json({ error }));
  })
  .catch(error => res.status(500).json({ error }));
};

exports.getAllComment = (req, res, next) => {
    Comment.findAll({include:[
      {
        model: User
      }
    ]})
        .then((comments) => res.status(200).json(comments))
        .catch((error) => res.status(400).json({ error }));
    };