const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const DiagnosisList = sequelize.define('diagnosisList', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
},{
    timestamps: false
});

module.exports = DiagnosisList;