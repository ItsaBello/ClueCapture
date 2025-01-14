'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn("Hint", "numberOfImages", {type: DataTypes.INTEGER});
    await queryInterface.removeColumn('game', 'maxSelectable');
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("Hint", "numberOfImages");
    await queryInterface.addColumn('game', 'maxSelectable', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 4, // Default value is set to 4
    });
  }
};
