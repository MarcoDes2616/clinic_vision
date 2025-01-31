const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const ClinicHistory = sequelize.define('clinicHistory', {
    previousMedical: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    lastAttention: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    referred: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: "NO"
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    timestamps: false
});

module.exports = ClinicHistory;