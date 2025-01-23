const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const DiagnosisList = sequelize.define('diagnosisList', {
    name: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
},{
    timestamps: false
});

module.exports = DiagnosisList;