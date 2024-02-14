const catchError = require('../utils/catchError');
const Measurement = require('../models/Measurement');

const getAllMeasurement = catchError(async(req, res) => {
    const results = await Measurement.findAll();
    return res.json(results);
});

const createMeasurement = catchError(async(req, res) => {
    await Measurement.create(req.body);
    return res.status(201).json({success: true});
});

const getOneMeasurement = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Measurement.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const removeMeasurement = catchError(async(req, res) => {
    const { id } = req.params;
    await Measurement.destroy({ where: {id} });
    return res.sendStatus(204);
});

const updateMeasurement = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Measurement.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAllMeasurement,
    createMeasurement,
    getOneMeasurement,
    removeMeasurement,
    updateMeasurement
}