'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const beds = [];

    // Floor 2 beds
    // Ruangan 1 (TOP_LEFT): 4 kasur [1-4]
    for (let i = 1; i <= 4; i++) {
      beds.push({
        id: i,
        status: 'available',
        room: 'TOP_LEFT',
        floor: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Ruangan 3 (LEFT): 7 kasur [5-11]
    for (let i = 5; i <= 11; i++) {
      beds.push({
        id: i,
        status: 'available',
        room: 'LEFT',
        floor: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Ruangan 4 (CENTER): 7 kasur [12-18]
    for (let i = 12; i <= 18; i++) {
      beds.push({
        id: i,
        status: 'available',
        room: 'CENTER',
        floor: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Ruangan 5 (RIGHT): 7 kasur [19-25]
    for (let i = 19; i <= 25; i++) {
      beds.push({
        id: i,
        status: 'available',
        room: 'RIGHT',
        floor: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Ruangan 6 (BOTTOM_CENTER): 6 kasur [26-31]
    for (let i = 26; i <= 31; i++) {
      beds.push({
        id: i,
        status: 'available',
        room: 'BOTTOM_CENTER',
        floor: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Floor 3 beds (dimulai dari 32)
    // LEFT_TOP: [32, 33]
    for (let i = 32; i <= 33; i++) {
      beds.push({
        id: i,
        status: 'available',
        room: 'LEFT_TOP',
        floor: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // LEFT_BOTTOM: [34, 39]
    for (let i = 34; i <= 39; i++) {
      beds.push({
        id: i,
        status: 'available',
        room: 'LEFT_BOTTOM',
        floor: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // MIDDLE: [40, 45]
    for (let i = 40; i <= 45; i++) {
      beds.push({
        id: i,
        status: 'available',
        room: 'MIDDLE',
        floor: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // RIGHT_TOP: [46, 47]
    for (let i = 46; i <= 47; i++) {
      beds.push({
        id: i,
        status: 'available',
        room: 'RIGHT_TOP',
        floor: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // RIGHT_BOTTOM: [48, 53]
    for (let i = 48; i <= 53; i++) {
      beds.push({
        id: i,
        status: 'available',
        room: 'RIGHT_BOTTOM',
        floor: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('beds', beds);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('beds', null, {});
  }
};

