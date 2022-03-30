const sequelize = require('../db/db.js');
const { DataTypes } = require('sequelize');
const Article = require ('../models/articleSchema');

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
});

User.hasMany(Article, { foreignKey: 'users_id', onDelete:'CASCADE', onUpdate: 'CASCADE'});

module.exports = User;