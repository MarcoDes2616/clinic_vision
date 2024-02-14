const { getAllPrescription, createPrescription, getOnePrescription, removePrescription, updatePrescription } = require('../controllers/prescription.controllers');
const express = require('express');
const verifyJWT = require('../middlewares/auth.middleware');

const prescriptionRouter = express.Router();

prescriptionRouter.route('/')
    .get(verifyJWT, getAllPrescription)
    .post(verifyJWT, createPrescription);

prescriptionRouter.route('/:id')
    .get(verifyJWT, getOnePrescription)
    .delete(verifyJWT, removePrescription)
    .put(verifyJWT, updatePrescription);

module.exports = prescriptionRouter;