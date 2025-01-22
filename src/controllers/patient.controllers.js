const catchError = require('../utils/catchError');
const Patient = require('../models/Patient');
const Enlistment = require('../models/Enlistment');
const ClinicHistory = require('../models/ClinicHistory');
const { Op } = require("sequelize");
const paginate = require('../utils/pagination');

const getAllPatient = catchError(async (req, res) => {
    let { search, page = 1 } = req.query;

    let condition = search
        ? {
              [Op.or]: [
                  { '$documentNumber$': { [Op.iLike]: `%${search}%` } },
                  { '$firstname$': { [Op.iLike]: `%${search}%` } },
                  { '$lastname$': { [Op.iLike]: `%${search}%` } },
              ],
          }
        : { status: true };

    const attributes = { exclude: ['enlistmentId', 'createdAt', 'updatedAt'] };
    const include = [
        {
            model: Enlistment,
        },
        {
            model: ClinicHistory,
            attributes: ['id', 'previousMedical'],
        },
    ];

    const response = await paginate({
        model: Patient,
        where: condition,
        attributes,
        include,
        page,
    });

    // Retornar la respuesta
    return res.json(response);
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
        attributes: { exclude: ['enlistmentId'] },
        include: [
            {
                model: Enlistment,
                attributes: ['name'],
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