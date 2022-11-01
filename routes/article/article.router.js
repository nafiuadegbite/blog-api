const express = require("express");
const { protect } = require("../../middleware/auth");
const {
  httpCreateArticle,
  httpGetAllArticles,
  httpGetArticleById,
  httpUpdateArticleToPublished,
} = require("./article.controller");

const blogRouter = express.Router();

blogRouter
  .get("/", httpGetAllArticles)
  .get("/:id", httpGetArticleById)
  .put("/:id", protect, httpUpdateArticleToPublished)
  .post("/", protect, httpCreateArticle);

module.exports = { blogRouter };
