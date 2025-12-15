require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'postgres.ypfmrmgckyyniqwzvjuo',
    password: process.env.DB_PASSWORD || 'Diona188',
    database: process.env.DB_NAME || 'postgres',
    host: process.env.DB_HOST || 'aws-1-ap-south-1.pooler.supabase.com',
    port: process.env.DB_PORT || 6543,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: console.log,
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false,
  }
};

