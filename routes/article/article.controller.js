// ================================= Article Controller ===============================

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
const { getPagination, setPagination } = require("../../services/query");
const { getReadingTime } = require("../../utils/readingTime");

// ================================= GET All Published Articles =========================

// @desc      Get Published Articles
// @route     GET /api/v1/blog
// @access    Public
const httpGetAllArticles = async (req, res) => {
  try {
    let query = req.query;

    // Destructuring GET request object
    let { page, skip, limit, sort, endIndex, select } = getPagination(query);

    let articles = await getAllArticles(query, skip, limit, sort);

    // Filtering Published Articles
    const publishedArticles = articles.filter((article) => {
      return article.state === "published";
    });

    // Total Published Articles
    const total = await getPublishedArticles();

    // Set Pagination's Object
    const pagination = setPagination(skip, endIndex, total, page, limit);

    res.status(200).json({ pagination, publishedArticles });
  } catch (error) {
    res.status(400).json({ message: "Bad Request" });
  }
};

// ================================= GET Articles By ID =================================

// @desc      Get Published Articles
// @route     GET /api/v1/blog/:id
// @access    Public
const httpGetArticleById = async (req, res) => {
  try {
    const { id } = req.params;

    const article = await getArticleById(id);

    // Check if Article Exist and Published
    if (!article || article.state === "draft") {
      return res.status(404).json({ message: "Article not found" });
    }

    return res.status(200).json(article);
  } catch (error) {
    res.status(400).json({ message: "Bad Request" });
  }
};

// ================================= GET Articles List Per User ==========================

// @desc      Get Articles List Per User
// @route     GET /api/v1/blog/list
// @access    Private
const httpGetArticleList = async (req, res) => {
  try {
    const query = req.query;
    const { page, skip, limit, sort, endIndex, select } = getPagination(query);

    // Get Article ID from User Schema
    let articleArray = [];
    req.user.articles.forEach((element) => {
      articleArray.push(JSON.parse(`{"_id": ${element}}`));
    });

    // Check if User have article
    if (articleArray.length === 0) {
      return res.status(404).json({ message: "No Articles found" });
    }

    const articleList = await getArticleList(
      articleArray,
      query,
      skip,
      limit,
      sort,
      select
    );

    // Get total number of Article
    const total = await getTotalArticleList(articleArray);

    const pagination = setPagination(skip, endIndex, total, page, limit);

    return res.status(200).json({ pagination, articleList });
  } catch (error) {
    res.status(400).json({ message: "Bad request" });
  }
};

// ================================= Create Article ======================================

// @desc      Create Article
// @route     POST /api/v1/blog
// @access    Private
const httpCreateArticle = async (req, res) => {
  try {
    // Ref author ID to article for Article Schema
    req.body.author = Number(req.user.id);

    let article = req.body;

    if (!article.title || !article.body) {
      return res.status(400).json({
        error: "Missing required property",
      });
    }

    // Check If title exist
    const existTitle = await findArticle({ title: article.title });

    if (existTitle) {
      return res
        .status(409)
        .json({ message: "Article with title already exists" });
    }

    // Set Article Reading Time and Author Name
    article.reading_time = getReadingTime(article.body);
    article.authorName = req.user.first_name;

    // Save article to database
    await createNewArticle(article);

    // Ref Article ID to User Schema
    await addArticle(req.user.id, article._id);

    return res.status(201).json({ message: "Article Created", article });
  } catch (error) {
    res.status(400).json({ message: "Bad Request" });
  }
};

// ================================= Update Article ======================================

// @desc      Update Article
// @route     PUT /api/v1/blog
// @access    Private
const httpUpdateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;

    if (Object.entries(update).length === 0) {
      return res.status(400).json({
        error: "Please enter an update value",
      });
    }

    let article = await getArticleById(id);

    // Check Article Exist
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    // Check if particular user's article
    const articleFound = req.user.articles.find(
      (element) => element === article._id
    );

    if (!articleFound) {
      return res
        .status(401)
        .json({ message: "Unauthorized to update article" });
    }

    await updateArticle({ _id: articleFound }, update);
    return res.status(201).json({ message: "Article Updated" });
  } catch (error) {
    res.status(400).json({ message: "Bad Request" });
  }
};

// ================================= Delete Article ======================================

// @desc      Create Article
// @route     DELETE /api/v1/blog
// @access    Private
const httpDeleteArticle = async (req, res) => {
  try {
    const { id } = req.params;

    let article = await getArticleById(id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    // Check if particular user's article
    const articleFound = req.user.articles.find(
      (element) => element === article._id
    );

    if (!articleFound) {
      return res
        .status(401)
        .json({ message: "Unauthorized to delete article" });
    }

    // Delete Article ID from User's Schema
    await deleteArticleFromAuthor(req.user.id, articleFound);

    // Delete Article from Database
    await deleteArticle({ _id: articleFound });
    return res.status(200).json({ message: "Article deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Bad Request" });
  }
};

// ================================= Export All Functions ================================

module.exports = {
  httpGetArticleList,
  httpGetAllArticles,
  httpGetArticleById,
  httpCreateArticle,
  httpUpdateArticle,
  httpDeleteArticle,
};

//========================================================================================
