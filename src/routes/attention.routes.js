const {
  getAllAttention,
  createAttention,
  getOneAttention,
  removeAttention,
  updateAttention,
} = require("../controllers/attention.controllers");
const express = require("express");
const verifyJWT = require("../middlewares/auth.middleware");
const isAdmin = require("../middlewares/isAdmin.middleware");

const attentionRouter = express.Router();

attentionRouter.route("/")
  .get(verifyJWT, getAllAttention)
  .post(verifyJWT, createAttention);

attentionRouter.route("/:id")
  .get(verifyJWT, getOneAttention)
  .delete(isAdmin, removeAttention)
  .put(verifyJWT, updateAttention);

module.exports = attentionRouter;
