const catchError = require('../utils/catchError');
const Location = require('../models/Location');
const Sponsorship = require('../models/Sponsorship');
const { where } = require('sequelize');

const getAll = catchError(async(req, res) => {
    let {sponsorship: sponsorshipId} = req.query

    const handleQueries = () => {
        if (sponsorshipId) {
            return {sponsorshipId: sponsorshipId} 
        } else {
            return null
        }
    }
    const results = await Location.findAll({
        where: handleQueries(),
        include: {
            model: Sponsorship,
            attributes: ["sponsor"]
        },
        order: [['id', 'DESC']]
    });
    return res.json(results);
});

const create = catchError(async(req, res) => {
    await Location.create(req.body);
    return res.status(201).json({ success: true});
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Location.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Location.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Location.update(
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