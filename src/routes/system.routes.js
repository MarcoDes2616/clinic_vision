const { login, getMe, resetPaswwordMail, updatePassword, 
    requestEmailVerification, verifyEmail, enableOrDisableUser } = require('../controllers/system.controllers');
const express = require('express');
const verifyJWT = require('../middlewares/auth.middleware');
const isAdmin = require('../middlewares/isAdmin.middleware');

const systemRouter = express.Router();

systemRouter.route("/login")
    .post(login)

systemRouter.route("/me")
    .get(verifyJWT, getMe)

systemRouter.route("/reset_password")
    .post(resetPaswwordMail)

systemRouter.route("/update_password")
    .post(updatePassword)

systemRouter.route("/verify_email")
    .post(requestEmailVerification)

systemRouter.route("/verify_email/:token")
    .get(verifyEmail)
 //system, requiere middleware de roles

systemRouter.route("/users/:id")//system, requiere middleware de roles
    .delete(isAdmin, enableOrDisableUser) //system, requiere middleware de roles


module.exports = systemRouter;