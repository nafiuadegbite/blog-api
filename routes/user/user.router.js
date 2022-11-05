const express = require("express");
const { protect } = require("../../middleware/auth");
const {
  httpGetAllUsers,
  httpLogin,
  httpProfile,
  httpRegister,
  httpLogout,
} = require("./user.controller");

const userRouter = express.Router();

userRouter
  .get("/profile", protect, httpProfile)
  .get("/logout", httpLogout)
  .post("/register", httpRegister)
  .post("/login", httpLogin);

module.exports = { userRouter };
