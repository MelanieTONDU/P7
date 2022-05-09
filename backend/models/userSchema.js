const sequelize = require('../db/db.js');
const { DataTypes } = require('sequelize');
const Article = require ('./articleSchema');
const Comment = require ('./commentSchema');

const User = sequelize.define('User', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  job: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  imageUrl :{
    type: DataTypes.STRING,
    allowNull: true,
  },
  isAdmin:{
    type: DataTypes.BOOLEAN,
    allowNull: true,
  }
});

User.hasMany(Article, {foreignKey: 'users_id', onDelete:'CASCADE'});
Article.belongsTo(User, {foreignKey: 'users_id'});

User.hasMany(Comment, {foreignKey: 'users_id', onDelete:'CASCADE'});
Comment.belongsTo(User, {foreignKey: 'users_id'});

module.exports = User; 