const catchError = require('../utils/catchError');
const DiagnosisList = require('../models/DiagnosisList');
const Location = require('../models/Location');

const getAll = catchError(async(req, res) => {
    let { enlistmentId } = req.query;
    const diagnosis = await DiagnosisList.findAll();
    const locations = await Location.findAll({
        where: { enlistmentId },
        order: [['id', 'DESC']]
    });
    return res.json({ diagnosis, locations });
});

const create = catchError(async(req, res) => {
    const result = await DiagnosisList.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await DiagnosisList.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await DiagnosisList.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await DiagnosisList.update(
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