const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Measurement = sequelize.define('Measurements', {
    scl_od: {
        type: DataTypes.STRING,
        allowNull: true
    },
    scl_oi: {
        type: DataTypes.STRING,
        allowNull: true
    },
    scc_od: {
        type: DataTypes.STRING,
        allowNull: true
    },
    scc_oi: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ccl_od: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ccl_oi: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ccc_od: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ccc_oi: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

module.exports = Measurement;
