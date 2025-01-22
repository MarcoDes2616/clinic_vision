const catchError = require('../utils/catchError');
const RxUse = require('../models/RxUse');

const getAllPrescription = catchError(async(req, res) => {
    const results = await RxUse.findAll();
    return res.json(results);
});

const createPrescription = catchError(async(req, res) => {
    await RxUse.create(req.body);
    return res.status(201).json({success: true});
});

const getOnePrescription = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await RxUse.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const removePrescription = catchError(async(req, res) => {
    const { id } = req.params;
    await RxUse.destroy({ where: {id} });
    return res.sendStatus(204);
});

const updatePrescription = catchError(async(req, res) => {
    const { id: attentionId } = req.params;
    const result = await RxUse.update(
        req.body,
        { where: {attentionId}, returning: true }
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