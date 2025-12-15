const { Sequelize } = require('sequelize');
const config = require('../config/database');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
    dialectOptions: dbConfig.dialectOptions,
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.Bed = require('./Bed')(sequelize, Sequelize);
db.Patient = require('./Patient')(sequelize, Sequelize);
db.Nurse = require('./Nurse')(sequelize, Sequelize);
db.NurseAssignment = require('./NurseAssignment')(sequelize, Sequelize);

// Define associations
db.Bed.belongsTo(db.Patient, { foreignKey: 'patientId', as: 'patient' });
db.Patient.hasMany(db.Bed, { foreignKey: 'patientId', as: 'beds' });

db.Bed.belongsTo(db.Nurse, { foreignKey: 'nurseId', as: 'nurse' });
db.Nurse.hasMany(db.Bed, { foreignKey: 'nurseId', as: 'beds' });

db.NurseAssignment.belongsTo(db.Nurse, { foreignKey: 'nurseId', as: 'nurse' });
db.Nurse.hasMany(db.NurseAssignment, { foreignKey: 'nurseId', as: 'assignments' });

db.NurseAssignment.belongsTo(db.Bed, { foreignKey: 'bedId', as: 'bed' });
db.Bed.hasMany(db.NurseAssignment, { foreignKey: 'bedId', as: 'nurseAssignments' });

module.exports = db;

