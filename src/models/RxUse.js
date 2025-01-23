const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const RxUse = sequelize.define('rx_uses', {
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
        allowNull: false
    },
    oi_axis_used: {
        type: DataTypes.STRING(20),
        allowNull: false
    }
},{
    timestamps: false
});

module.exports = RxUse;