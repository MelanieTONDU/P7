const User = require("../models/userSchema");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
          firstName : req.body.firstName,
          lastName : req.body.lastName,
          email: req.body.email,
          password: hash,
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(401).json({ error }));
      })
    .catch(error => res.status(500).json({ error }));
  };

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email },
    });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    const valid = await bcrypt.compare(req.body.password, user.password);
      if (!valid) {
        return res.status(401).json({ error: "Incorrect password" });
      }
      res.status(200).json({
        userId: user.id,
        token: jwt.sign(
          { userId: user.id },
          'SECRET_TOKEN',
          { expiresIn: '24h' }
        )
      });
    } 
  catch (error) {res.status(500).json({ error });}
};

exports.getOneAccount = (req, res, next) => {
  User.findOne({ id: req.params.id })
      .then((user) => res.status(200).json(user))
      .catch((error) => res.status(404).json({ error }));
  };

exports.getAllAccounts = (req, res, next) => {
    User.findAll()
        .then((users) => res.status(200).json(users))
        .catch((error) => res.status(400).json({ error }));
    };

exports.modifyAccount = (req, res, next) => {
  const userObject = req.file ?
  {
    ...JSON.parse(req.body.user),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };
User.update({ ...userObject, id:  req.params.id}, { where: {id: req.params.id} })
  .then(() => res.status(200).json({ message: 'Utilisateur modifié !'}))
  .catch(error => res.status(400).json({ error }));
};
  
exports.deleteAccount = (req, res, next) => {
  User.findOne({ where: {id: req.params.id} })
    .then(user => {
      if (!user) {
        res.status(404).json({error: new Error('No such Thing!')});
      }
        User.destroy({ where: {id: req.params.id} })
        .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
        .catch((error) => res.status(400).json({ error }));
      });
};