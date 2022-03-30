const sequelize = require('../db/db.js');
const { DataTypes } = require('sequelize');

const Article = sequelize.define('Article', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
  content: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  imageUrl :{
    type: DataTypes.STRING,
    allowNull: true,
  },
});


module.exports = Article;