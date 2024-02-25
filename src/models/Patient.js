const { DataTypes, STRING, BOOLEAN } = require('sequelize');
const sequelize = require('../utils/connection');

const Patient = sequelize.define('patients', {
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    documentNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    birthdate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    company: {
        type: DataTypes.STRING,
        defaultValue: "N/A"
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: STRING,
        allowNull: true
    },
    sex: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    status: {
        type: BOOLEAN,
        defaultValue: true,
    }
});

module.exports = Patient;
