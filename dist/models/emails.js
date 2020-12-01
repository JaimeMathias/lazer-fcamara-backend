"use strict";'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Emails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        this.belongsTo(models.Users, {
            foreignKey: 'id_user', 
            as: "id_users"
        })
    }
  };
  Emails.init({
    id_user: DataTypes.INTEGER,
    id_msg: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Emails',
  });
  return Emails;
};