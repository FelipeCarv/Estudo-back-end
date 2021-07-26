'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Posts', 'userId',{//adicionado uma nova coluna no post chamada 'userId'.
      type: Sequelize.INTEGER,
      references:{//tabela e o parâmetro que faz referencia a coluna que será adicionada
        model: 'Usuarios',
        key: 'id'
      },
      onDelete: 'SET NULL'//caso deletada, repassar 'NULL'.
    });
  },

  down: async (queryInterface, Sequelize) => {
   return queryInterface.removeColumn('Posts', 'userId');//removendo coluna
  }
};
