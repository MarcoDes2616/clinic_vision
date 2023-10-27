const catchError = require('../utils/catchError');
const Users = require('../models/Users');
const Role = require('../models/Roles');

const getAll = catchError(async(req, res) => {
    const isAdmin = req.isAdmin;
    console.log(isAdmin);
    if(!isAdmin) return res.sendStatus(401);
    const results = await Users.findAll({include:
        {model: Role, attributes: ['name']}});
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await Users.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Users.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Users.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Users.update(
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