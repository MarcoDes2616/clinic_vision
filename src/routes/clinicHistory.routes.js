const { getAllClinicHistory, getOneClinicHistory, removeClinicHistory, updateClinicHistory } = require('../controllers/clinicHistory.controllers');
const express = require('express');

const clinicHistoryRouter = express.Router();

clinicHistoryRouter.route('/')
    .get(getAllClinicHistory)

clinicHistoryRouter.route('/:id')
    .get(getOneClinicHistory)
    .delete(removeClinicHistory)
    .put(updateClinicHistory);

module.exports = clinicHistoryRouter;