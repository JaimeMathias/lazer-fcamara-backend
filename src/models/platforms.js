//const { Model, DataTypes } = require('sequelize');

//class Platforms extends Model {
//  static init(sequelize) {
//    super.init({
//      name: DataTypes.STRING,
//    }, {
//      sequelize
//    });
//  }
//}

//module.exports = new Platforms;

'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Platforms extends Model {
    static associate(models) {
      // define association here
    }
  };
  Platforms.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Platforms',
  });
  return Platforms;
};
