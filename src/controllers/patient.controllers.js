const catchError = require('../utils/catchError');
const Patient = require('../models/Patient');
const Sponsorship = require('../models/Sponsorship');

const getAllPatient = catchError(async(req, res) => {
    const results = await Patient.findAll({
        where: {status: true},
        attributes: { exclude: ['sponsorshipId'] },
        include: {
            model: Sponsorship,
            attributes: ['sponsor']
        },
        order: [['id', 'ASC']]
    });
    return res.json(results);
});

const createPatient = catchError(async(req, res) => {
    const result = await Patient.create(req.body);
    return res.status(201).json(result);
});

const getOnePatient = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Patient.findByPk(id, {
        attributes: { exclude: ['sponsorshipId'] },
        include: {
            model: Sponsorship,
            attributes: ['sponsor']
        }});
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const removePatient = catchError(async(req, res) => {
    const isAdmin = req.isAdmin;
    if (!isAdmin) return res.status(401).json({ message: "Unauthorized" });
    const { id } = req.params;
    const thisPatient = await Patient.findByPk(id);
    await Patient.update({ status: !thisPatient.status }, { where: { id } });
    return res.status(204).json({ success: true });
});

const updatePatient = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Patient.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAllPatient,
    createPatient,
    getOnePatient,
    removePatient,
    updatePatient
}