const express = require('express');
const cors = require('cors');
const db = require('./models');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/beds', require('./routes/beds'));
app.use('/api/nurses', require('./routes/nurses'));
app.use('/api/nurse-assignments', require('./routes/nurse-assignments'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'JKC Bed Management API is running' });
});

// Database connection and server start
db.sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
    
    // Sync database (create tables if they don't exist)
    // In production, use migrations instead
    if (process.env.NODE_ENV !== 'production') {
      db.sequelize.sync({ alter: false }).then(() => {
        console.log('Database synced successfully.');
      });
    }

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`API available at http://localhost:${PORT}/api`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  });

module.exports = app;

