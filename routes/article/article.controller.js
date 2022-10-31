const {
  createNewArticle,
  getAllArticles,
} = require("../../models/articles/articles.model");
const getPagination = require("../../services/query");

const httpGetAllArticles = async (req, res) => {
  const { skip, limit } = getPagination(req.query);
  const articles = await getAllArticles(skip, limit);

  res.status(200).json(articles);
};

const httpCreateArticle = async (req, res) => {
  const article = req.body;

  await createNewArticle(article);
  return res.status(201).json(article);
};

module.exports = { httpGetAllArticles, httpCreateArticle };
