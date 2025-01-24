const {
  getAll,
  create,
  getOne,
  remove,
  update,
} = require("../controllers/diagnosisList.controllers");
const express = require("express");

const controlListRouter = express.Router();

controlListRouter.route("/").get(getAll).post(create);

controlListRouter.route("/:id").get(getOne).delete(remove).put(update);

module.exports = controlListRouter;
