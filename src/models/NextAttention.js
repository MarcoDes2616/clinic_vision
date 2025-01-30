const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const NextAttention = sequelize.define('nextAttention', {
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
},{
    timestamps: false
});

module.exports = NextAttention;