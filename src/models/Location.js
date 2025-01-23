const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Location = sequelize.define('locations', {
    name: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
},{
    timestamps: false
});

module.exports = Location;