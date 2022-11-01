const express = require("express");
const {
  httpGetAllUsers,
  httpCreateUser,
  findUser,
  httpLogin,
  httpGetUserbyId,
} = require("./user.controller");

const userRouter = express.Router();

userRouter
  .get("/", httpGetAllUsers)
  .get("/:id", httpGetUserbyId)
  .post("/signup", httpCreateUser)
  .post("/login", httpLogin);

module.exports = { userRouter };
