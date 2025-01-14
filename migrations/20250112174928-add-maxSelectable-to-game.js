'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('game', 'maxSelectable', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 4, // Default value is set to 4
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('game', 'maxSelectable');
  }
};