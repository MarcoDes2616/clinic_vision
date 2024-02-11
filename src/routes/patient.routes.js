const {
  getAllPatient,
  createPatient,
  getOnePatient,
  removePatient,
  updatePatient
} = require("../controllers/patient.controllers");
const express = require("express");
const isAdmin = require("../middlewares/isAdmin.middleware");
const verifyJWT = require("../middlewares/auth.middleware");

const patientRouter = express.Router();

patientRouter.route("/")
    .get(verifyJWT, getAllPatient)
    .post(verifyJWT, createPatient);

patientRouter.route("/:id")
    .get(verifyJWT, getOnePatient)
    .delete(isAdmin, removePatient)
    .put(verifyJWT, updatePatient);

module.exports = patientRouter;
