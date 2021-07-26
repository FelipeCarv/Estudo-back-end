'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   return queryInterface.addColumn('Posts', 'Foto', {
    type: Sequelize.STRING
   });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Post', 'Foto');
  }
};
