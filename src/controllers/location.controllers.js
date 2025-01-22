const catchError = require("../utils/catchError");
const Location = require("../models/Location");
const Enlistment = require("../models/Enlistment");

const getAll = catchError(async (req, res) => {
  let { enlistmentId } = req.query;
  let listed;
  const handleQueries = () => {
    if (enlistmentId) {
      return {
        where: { enlistmentId },
        order: [["id", "DESC"]],
      };
    } else {
      return {
        include: {
          model: Enlistment,
          attributes: ["name"],
        },
        order: [["id", "DESC"]],
      };
    }
  };

  if (enlistmentId) {
    listed = await Enlistment.findOne({
      where: { id: enlistmentId },
    });
  }

  const results = await Location.findAll({
    ...handleQueries()
  });
  
  return res.json(enlistmentId ? {results, listed: listed.name} : {results});
});

const create = catchError(async (req, res) => {
  await Location.create(req.body);
  return res.status(201).json({ success: true });
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Location.findByPk(id);
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  await Location.destroy({ where: { id } });
  return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Location.update(req.body, {
    where: { id },
    returning: true,
  });
  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update,
};
