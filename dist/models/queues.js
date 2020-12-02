"use strict";'use strict';
const { Sequelize } = require('sequelize');
const sequelize = require('sequelize');
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Queues extends Model {
        
        static associate(models) {
        this.belongsTo(models.Users, {
            foreignKey: 'id_user', 
            as: "id_users"
        })
        
        this.belongsTo(models.Platforms, {
            foreignKey: 'id_platform',
            as: "id_platforms"
        })
        }
    };
    Queues.init({
        id_user: DataTypes.INTEGER,
        id_platform: DataTypes.INTEGER,
        status_user: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: 'Queues',
      });
      return Queues;
}
 