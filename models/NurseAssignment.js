module.exports = (sequelize, DataTypes) => {
  const NurseAssignment = sequelize.define('NurseAssignment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nurseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'nurses',
        key: 'id',
      },
    },
    bedId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'beds',
        key: 'id',
      },
    },
    assignedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    releasedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    tableName: 'nurse_assignments',
    timestamps: true,
  });

  return NurseAssignment;
};

