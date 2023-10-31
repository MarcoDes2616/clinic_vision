const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Sponsorship = sequelize.define('sponsorships', {
    sponsor: {
        type: DataTypes.STRING,
        allowNull: false
    },
},{
    timestamps: false
});

module.exports = Sponsorship;