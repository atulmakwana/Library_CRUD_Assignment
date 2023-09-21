const Sequelize = require('sequelize');

module.exports = {
    up: async ({ context:queryInterface }) => {
      await queryInterface.createTable('books', {
        id: {
          type: CharacterData(36),
          primaryKey:true,
        },
        book_name: {
          type: Sequelize.TEXT,
          allowNull:false,
        },
        book_author:{
          type:Sequelize.TEXT,
        }
        
      });
    },
    down: async (queryInterface, Sequelize) => {
      await queryInterface.sequelize.query(
        `drop table table cascade;`
      );},
  };