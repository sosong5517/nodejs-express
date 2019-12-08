'use strict';
module.exports = (sequelize, DataTypes) => {
  const books = sequelize.define('books', {
    id:{
      type: DataTypes.STRING,
      primaryKey:true},
      
    title: DataTypes.STRING,
    publisher: DataTypes.STRING,
    price: DataTypes.NUMBER,
    stock: DataTypes.NUMBER
  }, {
    timestamps : false,
   // tableName : 'books'
  });
  books.associate = function(models) {
    // associations can be defined here
  };
  return books;
};