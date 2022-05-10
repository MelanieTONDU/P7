const User = require("../models/userSchema");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');

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
        .then(() => res.status(201).json({'userId': user.id,
        'token': jwt.sign(
          { userId: user.id },
          'RANDOM_TOKEN_SECRET',
          { expiresIn: '24h' })}))
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
      return res.status(404).json({ error: "User not found" });
    }
    const valid = await bcrypt.compare(req.body.password, user.password);
      if (!valid) {
        return res.status(401).json({ error: "Incorrect password" });
      }
      res.status(200).json({
        'userId': user.id,
        'token': jwt.sign(
          { userId: user.id },
          'RANDOM_TOKEN_SECRET',
          { expiresIn: '24h' }
        )
      });
    } 
  catch (error) {res.status(500).json({ error });}
};

exports.getOneAccount = (req, res, next) => {
  User.findOne({ where: {id: req.params.id} })
    .then((user) => res.status(200).json({
      firstName : user.firstName,
      lastName : user.lastName,
      email : user.email,
      job : user.job,
      imageUrl : user.imageUrl,
      createdAt : user.createdAt,
      isAdmin : user.isAdmin,
    }))
    .catch((error) => res.status(404).json({ error }));
  };

exports.getAllAccounts = (req, res, next) => {
    User.findAll()
      .then((users) => res.status(200).json(users))
      .catch((error) => res.status(404).json({ error }));
    };

exports.modifyAccount = (req, res, next) => {
  const userObject = req.body;
    User.findOne({ where: {id: req.params.id} })
    .then(user => {
      if (!user) {
        res.status(404).json({error: new Error('No such Thing!')});
      }
      else if (user.id !== req.auth.userId ) {
        res.status(403).json({
          error: new Error('Unauthorized request !')
        });
      }
      if (req.body.password){
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
          const user = {
              firstName : req.body.firstName,
              lastName : req.body.lastName,
              email: req.body.email,
              job : req.body.job,
              password: hash,
          };
          User.update({...user, id:  req.params.id}, { where: {id: req.params.id} })
          .then((user) => res.status(200).json({
            firstName : user.firstName,
            lastName : user.lastName,
            email : user.email,
            job : user.job,
            imageUrl : user.imageUrl,
            createdAt : user.createdAt
          }))
          .catch(error => res.status(400).json({ error }));
        })
      }
      else if(req.file){
        const userObject = {...req.body, imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`};
          const filename = user.imageUrl.split('/images/')[1];
          fs.unlink(`images/${filename}`, () => {
            User.update({...userObject, id:  req.params.id}, { where: {id: req.params.id} })
            .then((userObject) => res.status(200).json({
              firstName : userObject.firstName,
              lastName : userObject.lastName,
              email : userObject.email,
              imageUrl : userObject.imageUrl,
              createdAt : userObject.createdAt
            }))
          .catch(error => res.status(400).json({ error }));
          })
        }
        else {
          User.update({...userObject, id:  req.params.id}, { where: {id: req.params.id} })
          .then((userObject) => res.status(200).json({
            firstName : userObject.firstName,
            lastName : userObject.lastName,
            email : userObject.email,
            imageUrl : userObject.imageUrl,
            createdAt : userObject.createdAt
          }))
        .catch(error => res.status(400).json({ error }));
        }
      })
    .catch(error => res.status(500).json({ error }));
  };

exports.deleteAccount = (req, res, next) => {
  User.findOne({ where: {id: req.params.id} })
    .then(user => {
      if (!user) {
        res.status(404).json({error: new Error('No such Thing!')});
      }
      if (user.id !== req.auth.userId) {
        res.status(403).json({error: new Error('Unauthorized request !')});
      }
      User.destroy({ where: {id: req.params.id} })
        .then(() => res.status(204))
        .catch((error) => res.status(400).json({ error }));
      })
    .catch(error => res.status(500).json({ error }));
  };