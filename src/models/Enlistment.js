const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Enlistment = sequelize.define('enlistment', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
},{
    timestamps: false
});

module.exports = Enlistment;