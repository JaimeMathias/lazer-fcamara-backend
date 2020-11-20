'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Filials',
  [
    {
      id: 1,
      location: 'Santos',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      location: 'São Paulo',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {}),

down: (queryInterface) => queryInterface.bulkDelete('Filials', null, {})
};
