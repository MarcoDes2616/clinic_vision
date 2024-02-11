const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Attention = sequelize.define('attentions', {
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    diagnosis: {
        type: DataTypes.STRING,
        allowNull: true
    },
    observations: {
        type: DataTypes.STRING,
        allowNull: true
    }
},{
    updatedAt: false
});

module.exports = Attention;
