'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Platforms',
  [
    {
      id: 1,
      name: 'PlayStation 4',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      name: 'Ping Pong',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 3,
      name: 'Sinuca',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {}),

down: (queryInterface) => queryInterface.bulkDelete('Platforms', null, {})
};
