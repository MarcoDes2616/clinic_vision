const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Location = sequelize.define('locations', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
},{
    timestamps: false
});

module.exports = Location;