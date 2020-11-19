'use strict';
const { Sequelize } = require('sequelize');
const sequelize = require('sequelize');
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Queues extends Model {
        
        static associate(models) {
        this.belongsTo(models.Users, {
            foreignKey: 'user_id'
        })
        
        this.belongsTo(models.Platforms, {
            foreignKey: 'platform_id'
        })
        }
    };
    Queues.init({
        members: DataTypes.INTEGER,
        platform: DataTypes.INTEGER,
        userState: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: 'Queues',
      });
      return Queues;
}
 