const Comment = require('../models/commentSchema');
const User = require('../models/userSchema');

exports.createComment = (req, res, next) => {
    const commentObject = req.body;
    const users_id = req.auth.userId;
    const url = req.originalUrl;
    const articles_id = url.split('/')[3];
    const comment = new Comment({...commentObject, users_id, articles_id})
    comment.save()
      .then(() => res.status(201).json(comment))
      .catch(error => res.status(400).json({ error }))
    };
    
exports.modifyComment = (req, res, next) => {
    const commentObject = req.body;
  Comment.findOne({ where: {id: req.params.id} })
    .then(comment => {
      if (!comment) {
        res.status(404).json({error: new Error('No such Thing!')});
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
      res.status(400).json({error: new Error('No such Thing!')});
    }
    Comment.destroy({ where: {id: req.params.id} })
    .then((comment) => res.status(204).json(comment.id))
    .catch(error => res.status(400).json({ error }));
  })
  .catch(error => res.status(500).json({ error }));
};

exports.getAllComment = (req, res, next) => {
let article_id = req.originalUrl.split("/")[3];
if(req.query.isAdmin){
  where = {
    where: {articles_id : article_id },
    include:[
      {model: User, attributes: ['firstName', 'lastName', 'id', 'job', 'imageUrl']}
    ],
    order: [["createdAt" , "DESC"]],
  }
}
  else {
  const size = JSON.parse(req.query.size);
  const page = JSON.parse(req.query.page);
  where = {
    where: {articles_id : article_id ,visible: true},
    include:[
      {model: User, attributes: ['firstName', 'lastName', 'id', 'job', 'imageUrl']},
    ],
    order: [["createdAt" , "DESC"]],
    limit : size,
    offset : page * size,
  }
}
  Comment.findAndCountAll(where)
        .then((comments) => 
          res.status(200).json({comments}))
        .catch((error) => res.status(400).json({ error }));
    };