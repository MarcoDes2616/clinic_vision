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
    },
    od_used: {
        type: DataTypes.STRING,
        allowNull: true
    },
    od_add_used: {
        type: DataTypes.STRING,
        allowNull: true
    },
    oi_used: {
        type: DataTypes.STRING,
        allowNull: true
    },
    oi_add_used: {
        type: DataTypes.STRING,
        allowNull: true
    },
},{
    timestamps: false
});

module.exports = Prescription;
