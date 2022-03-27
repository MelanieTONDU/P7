const sequelize = require('../db/db.js');
const { DataTypes } = require('sequelize');

const Article = sequelize.define('Article', {
    title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Article;