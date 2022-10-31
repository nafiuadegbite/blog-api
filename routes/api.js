const express = require("express");
const { blogRouter } = require("./article/article.router");
const { userRouter } = require("./user/user.router");

const api = express.Router();

api.use("/blog", blogRouter);
api.use("/user", userRouter);

module.exports = { api };
