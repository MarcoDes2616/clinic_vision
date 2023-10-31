const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const ClinicHistory = sequelize.define('clinicHistory', {
    previousMedical: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    lastAttention: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

module.exports = ClinicHistory;
