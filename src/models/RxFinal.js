const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const RxFinal = sequelize.define('rx_finals', {
    od_final: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    od_axis_final: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    od_add_final: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    oi_final: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    oi_axis_final: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    oi_add_final: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
},{
    timestamps: false
});


module.exports = RxFinal;