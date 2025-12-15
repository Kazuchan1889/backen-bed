module.exports = (sequelize, DataTypes) => {
  const Bed = sequelize.define('Bed', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false, // ID manual sesuai konfigurasi
    },
    status: {
      type: DataTypes.ENUM('available', 'occupied', 'repair', 'maintenance'),
      defaultValue: 'available',
      allowNull: false,
    },
    room: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    floor: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    patientId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Patients',
        key: 'id',
      },
    },
    assignedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    releasedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    repairNote: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    repairStartAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    repairEndAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    nurseId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'nurses',
        key: 'id',
      },
    },
  }, {
    tableName: 'beds',
    timestamps: true,
  });

  return Bed;
};
