const express = require("express");
const {
  httpCreateArticle,
  httpGetAllArticles,
} = require("./article.controller");

const blogRouter = express.Router();

blogRouter.get("/", httpGetAllArticles);
blogRouter.post("/", httpCreateArticle);

module.exports = { blogRouter };
