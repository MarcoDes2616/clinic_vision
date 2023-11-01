const { getAll, create, getOne, remove, update } = require('../controllers/location.controllers');
const express = require('express');

const locationRouter = express.Router();

locationRouter.route('/')
    .get(getAll)
    .post(create);

locationRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = locationRouter;