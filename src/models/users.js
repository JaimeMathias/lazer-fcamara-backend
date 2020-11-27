'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     this.belongsTo(models.Filials, {
       as: "id_filials", foreignKey: "id_filial"
     })
    }
  };
  Users.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    id_filial: DataTypes.INTEGER,
    receiveEmail: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};