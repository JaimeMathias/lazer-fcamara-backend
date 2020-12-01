"use strict";
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Platforms extends Model {
    static associate(models) {
      // define association here
    }
  };
  Platforms.init({
    name: DataTypes.STRING,
    location: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Platforms',
  });
  return Platforms;
};
