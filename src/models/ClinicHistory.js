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
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
},
{
    timestamps: false
});

module.exports = ClinicHistory;
