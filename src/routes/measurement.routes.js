const {
  getAllMeasurement,
  createMeasurement,
  getOneMeasurement,
  removeMeasurement,
  updateMeasurement,
} = require("../controllers/measurement.controllers");
const express = require("express");
const verifyJWT = require("../middlewares/auth.middleware");

const measurementRouter = express.Router();

measurementRouter.route("/")
  .get(verifyJWT, getAllMeasurement)
  .post(verifyJWT, createMeasurement);

measurementRouter.route("/:id")
  .get(verifyJWT, getOneMeasurement)
  .delete(verifyJWT, removeMeasurement)
  .put(verifyJWT, updateMeasurement);

module.exports = measurementRouter;
