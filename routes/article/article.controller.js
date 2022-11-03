const {
  createNewArticle,
  getArticleList,
  getAllArticles,
  getArticleById,
  findArticle,
  updateArticle,
  deleteArticle,
  getPublishedArticles,
  getTotalArticleList,
} = require("../../models/articles/articles.model");
const {
  addArticle,
  deleteArticleFromAuthor,
} = require("../../models/users/user.model");
const getPagination = require("../../services/query");
const { getReadingTime } = require("../../utils/readingTime");

const httpGetAllArticles = async (req, res) => {
  const { page, skip, limit } = getPagination(req.query);

  const articles = await getAllArticles(skip, limit);

  const publishedArticles = articles.filter((article) => {
    return article.state === "published";
  });

  const endIndex = page * limit;
  const total = await getPublishedArticles();

  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (skip > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.status(200).json({ pagination, publishedArticles });
};

const httpGetArticleById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      error: "Please enter an id",
    });
  }

  const article = await getArticleById(id);

  if (!article || article.state === "draft") {
    return res.status(404).json({ message: "Article not found" });
  }

  return res.status(200).json(article);
};

const httpCreateArticle = async (req, res) => {
  req.body.author = Number(req.user.id);

  let article = req.body;

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

  article.reading_time = getReadingTime(article.body);

  await createNewArticle(article);

  const articleFound = req.user.articles.find(
    (element) => element === article._id
  );

  if (!articleFound) {
    await addArticle(req.user.id, article._id);
  }

  return res.status(201).json(article);
};

const httpUpdateArticle = async (req, res) => {
  const { id } = req.params;
  const update = req.body;

  if (!id) {
    return res.status(400).json({
      error: "Please enter an id",
    });
  }

  let article = await getArticleById(id);

  if (!article) {
    return res.status(404).json({ message: "Article not found" });
  }

  const articleFound = req.user.articles.find(
    (element) => element === article._id
  );

  if (!articleFound) {
    return res.status(401).json({ message: "Unauthorized to update article" });
  }

  await updateArticle({ _id: articleFound }, update);
  article = await getArticleById(id);
  return res.status(200).json({ sucess: true, article });
};

const httpDeleteArticle = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      error: "Please enter an id",
    });
  }

  let article = await getArticleById(id);

  if (!article) {
    return res.status(404).json({ message: "Article not found" });
  }

  const articleFound = req.user.articles.find(
    (element) => element === article._id
  );

  if (!articleFound) {
    return res.status(401).json({ message: "Unauthorized to delete article" });
  }

  await deleteArticleFromAuthor(req.user.id, articleFound);
  await deleteArticle({ _id: articleFound });
  return res.status(200).json({ message: "Article deleted successfully" });
};

const httpGetArticleList = async (req, res) => {
  const { page, skip, limit } = getPagination(req.query);

  const query = req.query;

  let articleArray = [];
  req.user.articles.forEach((element) => {
    articleArray.push(JSON.parse(`{"_id": ${element}}`));
  });

  if (articleArray.length === 0) {
    return res.status(200).json({ message: "No Articles found" });
  }

  const articleList = await getArticleList(articleArray, query, skip, limit);

  const endIndex = page * limit;
  const total = await getTotalArticleList(articleArray);

  
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (skip > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  return res.status(200).json({ pagination, articleList });
};

module.exports = {
  httpGetArticleList,
  httpGetAllArticles,
  httpGetArticleById,
  httpCreateArticle,
  httpUpdateArticle,
  httpDeleteArticle,
};
