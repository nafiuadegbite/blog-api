const express = require("express");
const { protect } = require("../../middleware/auth");
const {
  httpCreateArticle,
  httpGetAllArticles,
} = require("./article.controller");

const blogRouter = express.Router();

blogRouter.get("/", httpGetAllArticles);
blogRouter.post("/", protect, httpCreateArticle);

module.exports = { blogRouter };
