const { getAll, create, getOne, remove, update } = require('../controllers/patient.controllers');
const express = require('express');
const isAdmin = require('../middlewares/isAdmin.middleware');

const patientRouter = express.Router();

patientRouter.route('/')
    .get(getAll)
    .post(create);

patientRouter.route('/:id')
    .get(getOne)
    .delete(isAdmin, remove)
    .put(update);

module.exports = patientRouter;