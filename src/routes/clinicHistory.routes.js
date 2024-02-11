const { getAllClinicHistory, getOneClinicHistory, removeClinicHistory, updateClinicHistory } = require('../controllers/clinicHistory.controllers');
const express = require('express');
const verifyJWT = require('../middlewares/auth.middleware');
const isAdmin = require('../middlewares/isAdmin.middleware');

const clinicHistoryRouter = express.Router();

clinicHistoryRouter.route('/')
    .get(verifyJWT, getAllClinicHistory)

clinicHistoryRouter.route('/:id')
    .get(verifyJWT, getOneClinicHistory)
    .delete(isAdmin, removeClinicHistory)
    .put(verifyJWT, updateClinicHistory);

module.exports = clinicHistoryRouter;