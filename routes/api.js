const express = require("express");
const { blogRouter } = require("./article/article.router");

const api = express.Router();

api.use("/blog", blogRouter);

module.exports = { api };
