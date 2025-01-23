const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Role = sequelize.define('role', {
    name: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
},{
    timestamps: false
});

module.exports = Role;