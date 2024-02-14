const catchError = require('../utils/catchError');
const Prescription = require('../models/Prescription');

const getAllPrescription = catchError(async(req, res) => {
    const results = await Prescription.findAll();
    return res.json(results);
});

const createPrescription = catchError(async(req, res) => {
    const result = await Prescription.create(req.body);
    return res.status(201).json({success: true});
});

const getOnePrescription = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Prescription.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const removePrescription = catchError(async(req, res) => {
    const { id } = req.params;
    await Prescription.destroy({ where: {id} });
    return res.sendStatus(204);
});

const updatePrescription = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Prescription.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAllPrescription,
    createPrescription,
    getOnePrescription,
    removePrescription,
    updatePrescription
}