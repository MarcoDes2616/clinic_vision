const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const DiagnosisList = sequelize.define('diagnosis_list', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
},{
    timestamps: false
});

module.exports = DiagnosisList;