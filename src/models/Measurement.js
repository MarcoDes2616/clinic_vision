const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Measurement = sequelize.define('measurement', {
    scl_od: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    scl_oi: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    scc_od: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    scc_oi: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    ccl_od: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    ccl_oi: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    ccc_od: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    ccc_oi: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
},
{
    timestamps: false
});

module.exports = Measurement;