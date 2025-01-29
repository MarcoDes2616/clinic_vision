const catchError = require("../utils/catchError");
const ClinicHistory = require("../models/ClinicHistory");
const Patient = require("../models/Patient");
const Attention = require("../models/Attention");
const Location = require("../models/Location");
const Users = require("../models/Users");
const Enlistment = require("../models/Enlistment");
const paginate = require("../utils/pagination");
const { Op } = require("sequelize");
const NextAttention = require("../models/NextAttention");
const DiagnosisList = require("../models/DiagnosisList");
const RxUse = require("../models/RxUse");
const Measurement = require("../models/Measurement");

const getAllClinicHistory = catchError(async (req, res) => {
  let { search, page = 1 } = req.query;

  let condition = search
    ? {
        [Op.or]: [
          { $documentNumber$: { [Op.iLike]: `%${search}%` } },
          { $firstname$: { [Op.iLike]: `%${search}%` } },
          { $lastname$: { [Op.iLike]: `%${search}%` } },
        ],
      }
    : "";

  let attributes = { exclude: ["patientId"] };
  let include = {
    model: Patient,
    attributes: ["id", "documentNumber", "firstname", "lastname"],
  };
  let order = [["id", "DESC"]];

  const results = await paginate({
    model: ClinicHistory,
    where: condition,
    attributes,
    include,
    order,
    page,
  });
  return res.json(results);
});

const getOneClinicHistory = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await ClinicHistory.findByPk(id, {
    attributes: { exclude: ["patientId"] },
    include: [
      {
        model: Patient,
        attributes: {
          exclude: ["enlistmentId", "createdAt", "updatedAt", "status"],
        },
        include: [
          {
            model: Enlistment,
          },
          {
            model: NextAttention,
            attributes: { exclude: ["patientId"]}
          },
        ],
      },
      {
        model: Attention,
        attributes: { exclude: ["locationId", "clinicHistoryId", "userId"] },
        include: [
          {
            model: Users,
            attributes: ["id", "firstname", "lastname"],
          },
          {
            model: Location,
          },
          {
            model: DiagnosisList
          },
          {
            model: RxUse,
          },
          {
            model: Measurement,
          }
        ],
        order: [["id", "DESC"]],
      },
    ],
  });
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

const removeClinicHistory = catchError(async (req, res) => {
  const isAdmin = req.isAdmin;
  if (!isAdmin) return res.status(401).json({ message: "Unauthorized" });
  const { id } = req.params;
  const thisClinicHistory = await Patient.findByPk(id);
  await Patient.update(
    { status: !thisClinicHistory.status },
    { where: { id } }
  );
  return res.status(204).json({ success: true });
});

const updateClinicHistory = catchError(async (req, res) => {
  const { id } = req.params;
  const { patientId, ...restOfData } = req.body;
  const result = await ClinicHistory.update(restOfData, {
    where: { id },
    returning: true,
  });
  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});

module.exports = {
  getAllClinicHistory,
  getOneClinicHistory,
  removeClinicHistory,
  updateClinicHistory,
};
