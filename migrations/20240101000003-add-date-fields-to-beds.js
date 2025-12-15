'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('beds', 'releasedAt', {
      type: Sequelize.DATE,
      allowNull: true,
    });

    await queryInterface.addColumn('beds', 'repairStartAt', {
      type: Sequelize.DATE,
      allowNull: true,
    });

    await queryInterface.addColumn('beds', 'repairEndAt', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('beds', 'releasedAt');
    await queryInterface.removeColumn('beds', 'repairStartAt');
    await queryInterface.removeColumn('beds', 'repairEndAt');
  }
};

