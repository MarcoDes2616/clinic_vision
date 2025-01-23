const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Patient = sequelize.define('patients', {
    firstname: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    documentNumber: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: true
    },
    birthdate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    company: {
        type: DataTypes.STRING(50),
        defaultValue: "N/A"
    },
    phone: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    address: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    sex: {
        type: DataTypes.STRING(10),
        allowNull: true
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    timestamps: false
});

module.exports = Patient;
