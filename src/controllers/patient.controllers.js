const catchError = require('../utils/catchError');
const Patient = require('../models/Patient');
const Sponsorship = require('../models/Sponsorship');
const ClinicHistory = require('../models/ClinicHistory');
const { Op } = require("sequelize");

const getAllPatient = catchError(async (req, res) => {
    let { search, page = 1, limit = 10 } = req.query;

    page = parseInt(page, 10) || 1;
    limit = parseInt(limit, 10) || 15;
    const offset = (page - 1) * limit;

    let condition = search
        ? {
              [Op.or]: [
                  { '$documentNumber$': { [Op.iLike]: `%${search}%` } },
                  { '$firstname$': { [Op.iLike]: `%${search}%` } },
                  { '$lastname$': { [Op.iLike]: `%${search}%` } },
              ],
          }
        : { status: true };

    const { count, rows } = await Patient.findAndCountAll({
        where: condition,
        attributes: { exclude: ['sponsorshipId', 'createdAt', 'updatedAt'] },
        include: [
            {
                model: Sponsorship,
            },
            {
                model: ClinicHistory,
                attributes: ['id', 'previousMedical'],
            },
        ],
        order: [['id', 'DESC']],
        limit,
        offset,
    });

    const totalPages = Math.ceil(count / limit);
    return res.json({
        results: rows,
        currentPage: page,
        totalPages,
        totalItems: count,
    });
});


const createPatient = catchError(async(req, res) => {
    const {previousMedical, ...restOfData} = req.body
    const {id} = await Patient.create(restOfData);
    try {
        const dataClinicHistory = {
            patientId: id,
            previousMedical 
        }
        await ClinicHistory.create(dataClinicHistory)
    } catch (error) {
        await Patient.destroy({where: {id}})
        return res.status(409).json({result: "conflict", error: error.original})
    }

    return res.status(201).json({ success: true });
});

const getOnePatient = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Patient.findByPk(id, {
        attributes: { exclude: ['sponsorshipId'] },
        include: [
            {
                model: Sponsorship,
                attributes: ['sponsor'],
            },
            {
                model: ClinicHistory,
                attributes: {exclude: ["patientId"]}
            }
        ],
    });
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
    const {previousMedical, ...restOfData} = req.body
    const result = await Patient.update(
        restOfData,
        { where: {id}, returning: true }
    );
    await ClinicHistory.update(
        {previousMedical},
        { where: {patientId: id}}
    )
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