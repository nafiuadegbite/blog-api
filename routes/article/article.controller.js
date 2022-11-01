const {
  createNewArticle,
  getAllArticles,
  getArticleById,
  findArticle,
  updateArticleToPublished,
} = require("../../models/articles/articles.model");
const { addArticle } = require("../../models/users/user.model");
const getPagination = require("../../services/query");

const httpGetAllArticles = async (req, res) => {
  const { skip, limit } = getPagination(req.query);
  const articles = await getAllArticles(skip, limit);

  const publishedArticles = articles.filter((article) => {
    return article.state === "published";
  });

  res.status(200).json(publishedArticles);
};

const httpGetArticleById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      error: "Please enter an id",
    });
  }

  const article = await getArticleById(id);

  if (!article) {
    return res.status(404).json({ message: "Article not found" });
  }

  return res.status(200).json(article);
};

const httpCreateArticle = async (req, res) => {
  req.body.author = Number(req.user.id);

  const article = req.body;

  if (!article.title || !article.body) {
    return res.status(400).json({
      error: "Missing required property",
    });
  }

  const existArticle = await findArticle({ title: article.title });

  if (existArticle) {
    return res
      .status(404)
      .json({ message: "Article with title already exists" });
  }

  await createNewArticle(article);
  await addArticle(req.user.id, article._id);
  return res.status(201).json(article);
};

const httpUpdateArticleToPublished = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      error: "Please enter an id",
    });
  }

  const article = await getArticleById(id);

  if (!article) {
    return res.status(404).json({ message: "Article not found" });
  }

  const articleFound = req.user.articles.find(
    (element) => element === article._id
  );

  console.log(articleFound);

  if (!articleFound) {
    return res.status(401).json({ message: "Unauthorized to update article" });
  }

  await updateArticleToPublished({ _id: articleFound });
  return res.status(200).json({ sucess: true, article });
};

module.exports = {
  httpGetAllArticles,
  httpGetArticleById,
  httpCreateArticle,
  httpUpdateArticleToPublished,
};
