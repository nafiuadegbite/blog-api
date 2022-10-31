const express = require("express");
const {
  httpGetAllUsers,
  httpCreateUser,
  findUser,
  httpLogin,
} = require("./user.controller");

const userRouter = express.Router();

userRouter
  .get("/", httpGetAllUsers)
  .post("/signup", httpCreateUser)
  .post("/login", httpLogin);

module.exports = { userRouter };
