const catchError = require("../utils/catchError");
const Location = require("../models/Location");
const Sponsorship = require("../models/Sponsorship");

const getAll = catchError(async (req, res) => {
  let { sponsorship: sponsorshipId } = req.query;
  let sponsor;
  const handleQueries = () => {
    if (sponsorshipId) {
      return {
        where: { sponsorshipId: sponsorshipId },
        order: [["id", "DESC"]],
      };
    } else {
      return {
        include: {
          model: Sponsorship,
          attributes: ["sponsor"],
        },
        order: [["id", "DESC"]],
      };
    }
  };

  if (sponsorshipId) {
    sponsor = await Sponsorship.findOne({
      where: { id: sponsorshipId },
    });
  }
  console.log(sponsor);
  
  const results = await Location.findAll({
    ...handleQueries()
  });
  
  return res.json(sponsorshipId ? {results, sponsor: sponsor.sponsor} : {results});
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
