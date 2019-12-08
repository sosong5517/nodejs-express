'use strict';
module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    id: {
    type:DataTypes.STRING,
    primaryKey:true},
    name: DataTypes.STRING,
    nik: DataTypes.STRING
  }, {
    timestamps : false,
    tableName : 'students'
  });
  Student.associate = function(models) {
    // associations can be defined here
  };
  return Student;
};