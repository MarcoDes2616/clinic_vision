const catchError = require('../utils/catchError');
const Attention = require('../models/Attention');
const ClinicHistory = require('../models/ClinicHistory');

const getAllAttention = catchError(async(req, res) => {
    const results = await Attention.findAll();
    return res.json(results);
});

const createAttention = catchError(async(req, res) => {
    const {clinicHistoryId, locationId} = req.body
    const data = {
        date: new Date(),
        userId: req.user.id,
        clinicHistoryId,
        locationId
    }
    const result = await Attention.create(data);
    try {
        await ClinicHistory.update({lastAttention: new Date()}, {
            where: {id: clinicHistoryId}
        })
    } catch (error) {
        await Attention.destroy({where: {id: result.id}})
        return res.status(409).json({result: "conflict", error})
    }
    return res.status(201).json(result);
});

const getOneAttention = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Attention.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const removeAttention = catchError(async(req, res) => {
    const { id } = req.params;
    await Attention.destroy({ where: {id} });
    return res.sendStatus(204);
});

const updateAttention = catchError(async(req, res) => {
    const { id } = req.params;
    const {userId, clinicHistoryId, locationId, restOfData} = req.body
    const result = await Attention.update(
        restOfData,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAllAttention,
    createAttention,
    getOneAttention,
    removeAttention,
    updateAttention
}