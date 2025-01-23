const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Attention = sequelize.define('attentions', {
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    observations: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    requireLenses: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    reasonConsultation: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    lensesType: {
        type: DataTypes.STRING(50),
        defaultValue: false
    },
    useRecomendation: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
}, {
    timestamps: false
});

module.exports = Attention;