const Comment = require('../models/commentSchema');

exports.createComment = (req, res, next) => {
    const commentObject = req.body;
    const comment = new Comment({
            ...commentObject,})
    comment.save()
        .then(() => res.status(201).json(comment))
        .catch(error => res.status(400).json({ error }));
      }
      
exports.modifyComment = (req, res, next) => {
    const articleObject = req.body;
  Comment.findOne({ where: {id: req.params.id} })
    .then(comment => {
      if (!comment) {
        res.status(404).json({error: new Error('No such Thing!')});
      }
      Comment.update({ ...articleObject, id:  req.params.id}, { where: {id: req.params.id} })
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
    Comment.destroy({ where: {id: req.params.id} })
    .then(() => res.status(204))
    .catch(error => res.status(400).json({ error }));
  })
  .catch(error => res.status(500).json({ error }));
};