const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Attention = sequelize.define('attentions', {
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    observations: {
        type: DataTypes.STRING,
        allowNull: true
    },
    requireLenses: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    lensesType: {
        type: DataTypes.STRING,
        allowNull: true
    },
    use_recomendation: {
        type: DataTypes.STRING,
        allowNull: true
    },
},{
    timestamps: false
});

module.exports = Attention;
