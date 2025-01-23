const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Enlistment = sequelize.define('enlistment', {
    name: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
},{
    timestamps: false
});

module.exports = Enlistment;