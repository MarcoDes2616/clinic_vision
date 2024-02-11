const catchError = require('../utils/catchError');
const ClinicHistory = require('../models/ClinicHistory');
const Patient = require('../models/Patient');
const Attention = require('../models/Attention');
const Measurement = require('../models/Measurement');
const Location = require('../models/Location');
const Prescription = require('../models/Prescription');
const Users = require('../models/Users');

const getAllClinicHistory = catchError(async(req, res) => {
    const results = await ClinicHistory.findAll({
        where: {status: true},
        attributes: {exclude: ["patientId"]},
        include: {
            model: Patient,
            attributes: ["id", "documentNumber", "firstname", "lastname"]
        }
    });
    return res.json(results);
});

const getOneClinicHistory = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await ClinicHistory.findByPk(id, {
        attributes: {exclude: ["patientId"]},
        include: [
            {
                model: Patient,
                attributes: ["id", "documentNumber", "firstname", "lastname"]
            },
            {
                model: Attention,
                attributes: { exclude: ["measurementId", "prescriptionId", "locationId", "clinicHistoryId", "userId"]},
                include: [
                    {
                        model: Users,
                        attributes: ["id", "firstname", "lastname"]
                    },
                    {
                        model: Location,
                    },
                    {
                        model: Prescription,
                    },
                    {
                        model: Measurement,
                    },
                ]
            }
        ]
    });
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const removeClinicHistory = catchError(async(req, res) => {
    const isAdmin = req.isAdmin;
    if (!isAdmin) return res.status(401).json({ message: "Unauthorized" });
    const { id } = req.params;
    const thisClinicHistory = await Patient.findByPk(id);
    await Patient.update({ status: !thisClinicHistory.status }, { where: { id } });
    return res.status(204).json({ success: true });
});

const updateClinicHistory = catchError(async(req, res) => {
    const { id } = req.params;
    const {patientId, ...restOfData} = req.body
    const result = await ClinicHistory.update(
        restOfData,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAllClinicHistory,
    getOneClinicHistory,
    removeClinicHistory,
    updateClinicHistory
}