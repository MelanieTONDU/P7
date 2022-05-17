const sequelize = require('../db/db.js');
const { DataTypes } = require('sequelize');

const Comment = sequelize.define('Comment', {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    visible : {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    }
  });
  
  module.exports = Comment;