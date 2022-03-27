const sequelize = require('../db/db.js');
const { DataTypes } = require('sequelize');

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

  picture: {
    type: DataTypes.STRING,
    allowNull: true,
  },

});

module.exports = User;