const {
  getAllPatient,
  createPatient,
  getOnePatient,
  removePatient,
  updatePatient
} = require("../controllers/patient.controllers");
const express = require("express");
const isAdmin = require("../middlewares/isAdmin.middleware");

const patientRouter = express.Router();

patientRouter.route("/")
    .get(getAllPatient)
    .post(createPatient);

patientRouter
    .route("/:id")
    .get(getOnePatient)
    .delete(isAdmin, removePatient)
    .put(updatePatient);

module.exports = patientRouter;
