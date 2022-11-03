const express = require("express");
const { protect } = require("../../middleware/auth");
const {
  httpGetAllUsers,
  httpLogin,
  httpProfile,
  httpRegister,
} = require("./user.controller");

const userRouter = express.Router();

userRouter
  .get("/", httpGetAllUsers)
  .get("/profile", protect, httpProfile)
  .post("/signup", httpRegister)
  .post("/login", httpLogin);

module.exports = { userRouter };
