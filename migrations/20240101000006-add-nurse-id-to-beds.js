'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('beds', 'nurseId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'nurses',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('beds', 'nurseId');
  }
};

