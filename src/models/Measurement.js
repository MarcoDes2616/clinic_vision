const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Measurement = sequelize.define('measurement', {
    scl_od: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    scl_oi: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    scc_od: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    scc_oi: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    ccl_od: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    ccl_oi: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    ccc_od: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    ccc_oi: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    od_axis: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    oi_axis: {
        type: DataTypes.STRING(20),
        allowNull: false
    }
},
{
    timestamps: false
});

module.exports = Measurement;