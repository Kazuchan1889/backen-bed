const { sequelize } = require('../models');
const db = require('../models');

async function initDatabase() {
  try {
    // Test connection
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    // Sync all models
    await sequelize.sync({ force: false, alter: true });
    console.log('Database synced successfully.');

    // Check if beds already exist
    const bedCount = await db.Bed.count();
    
    if (bedCount === 0) {
      console.log('No beds found. Running seeders...');
      
      // Seed beds
      const beds = [];

      // Floor 2 beds
      // Ruangan 1 (TOP_LEFT): 4 kasur [1-4]
      for (let i = 1; i <= 4; i++) {
        beds.push({
          id: i,
          status: 'available',
          room: 'TOP_LEFT',
          floor: 2,
        });
      }

      // Ruangan 3 (LEFT): 7 kasur [5-11]
      for (let i = 5; i <= 11; i++) {
        beds.push({
          id: i,
          status: 'available',
          room: 'LEFT',
          floor: 2,
        });
      }

      // Ruangan 4 (CENTER): 7 kasur [12-18]
      for (let i = 12; i <= 18; i++) {
        beds.push({
          id: i,
          status: 'available',
          room: 'CENTER',
          floor: 2,
        });
      }

      // Ruangan 5 (RIGHT): 7 kasur [19-25]
      for (let i = 19; i <= 25; i++) {
        beds.push({
          id: i,
          status: 'available',
          room: 'RIGHT',
          floor: 2,
        });
      }

      // Ruangan 6 (BOTTOM_CENTER): 6 kasur [26-31]
      for (let i = 26; i <= 31; i++) {
        beds.push({
          id: i,
          status: 'available',
          room: 'BOTTOM_CENTER',
          floor: 2,
        });
      }

      // Floor 3 beds (dimulai dari 32)
      for (let i = 32; i <= 33; i++) {
        beds.push({
          id: i,
          status: 'available',
          room: 'LEFT_TOP',
          floor: 3,
        });
      }

      for (let i = 34; i <= 39; i++) {
        beds.push({
          id: i,
          status: 'available',
          room: 'LEFT_BOTTOM',
          floor: 3,
        });
      }

      for (let i = 40; i <= 45; i++) {
        beds.push({
          id: i,
          status: 'available',
          room: 'MIDDLE',
          floor: 3,
        });
      }

      for (let i = 46; i <= 47; i++) {
        beds.push({
          id: i,
          status: 'available',
          room: 'RIGHT_TOP',
          floor: 3,
        });
      }

      for (let i = 48; i <= 53; i++) {
        beds.push({
          id: i,
          status: 'available',
          room: 'RIGHT_BOTTOM',
          floor: 3,
        });
      }

      await db.Bed.bulkCreate(beds);
      console.log(`Created ${beds.length} beds successfully.`);
    } else {
      console.log(`Database already has ${bedCount} beds. Skipping seed.`);
    }

    process.exit(0);
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

initDatabase();

