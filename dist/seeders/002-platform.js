"use strict";'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Platforms',
  [
    {
      name: 'PlayStation 4',
      location: 'Recreacao',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'PlayStation 4',
      location: 'Sala Zelda',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Sinuca',
      location: 'Patio',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {}),

down: (queryInterface) => queryInterface.bulkDelete('Platforms', null, {})
};
