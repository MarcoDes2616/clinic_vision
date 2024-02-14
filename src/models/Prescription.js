const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Prescription = sequelize.define('prescriptions', {
    od: {
        type: DataTypes.STRING,
        allowNull: false
    },
    od_add: {
        type: DataTypes.STRING,
        allowNull: false
    },
    oi: {
        type: DataTypes.STRING,
        allowNull: false
    },
    oi_add: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    timestamps: false
});

module.exports = Prescription;
