const { getAll, create, getOne, enableOrDisableUser, update } = require('../controllers/users.controllers');
const express = require('express');
const isAdmin = require('../middlewares/isAdmin.middleware');
const upload = require("../utils/multer.js");
const { firebaseFile } = require("../middlewares/firebase.middleware");

const userRouter = express.Router();

userRouter.route('/')
    .get(isAdmin, getAll)
    .post(isAdmin, upload.single("file"), firebaseFile, create);

userRouter.route('/:id')
    .get(isAdmin, getOne)
    .delete(isAdmin, enableOrDisableUser)
    .put(isAdmin, upload.single("file"), firebaseFile, update);

module.exports = userRouter;