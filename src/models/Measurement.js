const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Measurement = sequelize.define('measurement', {
    scl_od: {
        type: DataTypes.STRING,
        allowNull: false
    },
    scl_oi: {
        type: DataTypes.STRING,
        allowNull: false
    },
    scc_od: {
        type: DataTypes.STRING,
        allowNull: false
    },
    scc_oi: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ccl_od: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ccl_oi: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ccc_od: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ccc_oi: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    timestamps: false
});

module.exports = Measurement;