const express = require("express");
const { protect } = require("../../middleware/auth");
const {
  httpLogin,
  httpProfile,
  httpRegister,
  httpLogout,
  httpUpdateUser,
} = require("./user.controller");

const userRouter = express.Router();

userRouter
  .get("/profile", protect, httpProfile)
  .get("/logout", httpLogout)
  .post("/register", httpRegister)
  .post("/login", httpLogin)
  .put("/updatedetails", protect, httpUpdateUser);

module.exports = { userRouter };
