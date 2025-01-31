const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const RxFinal = sequelize.define('rx_finals', {
    od_used: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    od_add_used: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    oi_used: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    oi_add_used: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    od_axis_used: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    oi_axis_used: {
        type: DataTypes.STRING(20),
        allowNull: true
    }
},{
    timestamps: false
});


module.exports = RxFinal;