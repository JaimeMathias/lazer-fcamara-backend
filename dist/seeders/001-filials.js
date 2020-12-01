"use strict";'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Filials',
  [
    {
      location: 'Santos',
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      location: 'São Paulo',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {}),

down: (queryInterface) => queryInterface.bulkDelete('Filials', null, {})
};
