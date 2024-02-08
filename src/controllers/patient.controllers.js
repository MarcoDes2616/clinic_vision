const catchError = require('../utils/catchError');
const Patient = require('../models/Patient');

const getAll = catchError(async(req, res) => {
    const results = await Patient.findAll({
        where: {status: true}
    });
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await Patient.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Patient.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const thisPatient = await Patient.findByPk(id);
    await Patient.update({ status: !thisPatient.status }, { where: { id } });
    return res.status(204).json({ success: true });
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Patient.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}