const catchError = require('../utils/catchError');
const Attention = require('../models/Attention');
const ClinicHistory = require('../models/ClinicHistory');
const moment = require('moment-timezone');
const RxUse = require('../models/RxUse');
const Users = require('../models/Users');
const Prescription = require('../models/Prescription');
const Measurement = require('../models/Measurement');
const Location = require('../models/Location');
const Patient = require('../models/Patient');

const getAllAttention = catchError(async(req, res) => {
    const results = await Attention.findAll();
    return res.json(results);
});

const createAttention = catchError(async(req, res) => {
    const {clinicHistoryId, locationId, ...restOfData} = req.body
    const date = moment().tz('America/Guayaquil').format('YYYY-MM-DD')
    const data = {
        date,
        userId: req.user.id,
        clinicHistoryId,
        locationId
    }
    const result = await Attention.create(data);
    try {
        await RxUse.create({...restOfData, attentionId: result.id})
        await ClinicHistory.update({lastAttention: date}, {
            where: {id: clinicHistoryId}
        })
        
    } catch (error) {
        await Attention.destroy({where: {id: result.id}})
        return res.status(409).json({result: "conflict", error})
    }
    return res.status(201).json({success: true, attentionId: result.id});
});

const getOneAttention = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Attention.findByPk(id, {
        attributes: {exclude: ["userId", "locationId", "clinicHistoryId"]},
        include: [
            {
                model: Users,
                attributes: ["id", "firstname", "lastname"]
            },
            {
                model: ClinicHistory,
                attributes: ["id"],
                include: {
                    model: Patient
                }
            },
            {
                model: Location,
            },
            {
                model: RxUse,
            },
            {
                model: Prescription,
                attributes: {exclude: ["attentionId"]}
            },
            {
                model: Measurement,
                attributes: {exclude: ["attentionId"]}
            },
        ],
    });
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
    const {userId, clinicHistoryId, locationId, date, ...restOfData} = req.body
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