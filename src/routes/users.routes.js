const { getAll, create, getOne, enableOrDisableUser, update } = require('../controllers/users.controllers');
const express = require('express');
const isAdmin = require('../middlewares/isAdmin.middleware');
const upload = require("../utils/multer.js");
const saveImage = require('../middlewares/multer.middleware.js');

const userRouter = express.Router();

userRouter.route('/')
    .get(isAdmin, getAll)
    .post(isAdmin, upload.single("file"), saveImage, create);

userRouter.route('/:id')
    .get(isAdmin, getOne)
    .delete(isAdmin, enableOrDisableUser)
    .put(isAdmin, upload.single("file"), saveImage, update);

module.exports = userRouter;