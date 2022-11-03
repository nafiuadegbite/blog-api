const express = require("express");
const { protect } = require("../../middleware/auth");
const {
  httpCreateArticle,
  httpGetAllArticles,
  httpGetArticleById,
  httpUpdateArticle,
  httpDeleteArticle,
  httpGetArticleList,
} = require("./article.controller");

const blogRouter = express.Router();

blogRouter
  .get("/list", protect, httpGetArticleList)
  .get("/", httpGetAllArticles)
  .get("/:id", httpGetArticleById)
  .put("/:id", protect, httpUpdateArticle)
  .post("/", protect, httpCreateArticle)
  .delete("/:id", protect, httpDeleteArticle);

module.exports = { blogRouter };
