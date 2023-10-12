// ======================== Article Database Model ==========================

const articleDatabase = require("./articles.mongo");

// Default ID
const DEFAULT_ID = 0;

// ========================== GET All Articles ==============================

const getAllArticles = async (query, skip, limit, sort) => {
  return await articleDatabase
    .find(query, {
      __v: 0,
      state: { $in: "published" }
    })
    .populate("author", { _id: 0, first_name: 1, last_name: 1 })
    .sort(sort)
    .skip(skip)
    .limit(limit);
};

// ===================== GET Total Published Articles =======================

const getPublishedArticles = async () => {
  return await articleDatabase.count({ state: { $in: "published" } });
};

// ================== GET List of Articles Per Author =======================

const getArticleList = async (filter, state, skip, limit, sort, select) => {
  return await articleDatabase
    .find({ $or: filter, $and: [state] })
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .select(select);
};

// ================= GET Total List of Articles Per Author ==================

const getTotalArticleList = async (filter) => {
  return await articleDatabase.count({ $or: filter });
};

// ======================= GET Each Article By Id ===========================

const getArticleById = async (id) => {
  return await articleDatabase
    .findByIdAndUpdate(
      id,
      {
        $inc: { read_count: 1 },
      },
      {
        __v: 0,
      }
    )
    .populate("author", { _id: 0, first_name: 1, last_name: 1 });
};

// ============================== Save Article ==============================

const saveArticle = async (article) => {
  await articleDatabase.findOneAndUpdate(
    {
      _id: article._id,
    },
    article,
    {
      upsert: true,
    }
  );
};

// ======================= Get Last Article ID ==============================

const getArticleId = async () => {
  const latestArticle = await articleDatabase.findOne().sort("-_id");

  if (!latestArticle) {
    return DEFAULT_ID;
  }

  return latestArticle._id;
};

// ======================= Create New Article ===============================

const createNewArticle = async (article) => {
  // Set new ID for Artlicle
  const newId = (await getArticleId()) + 1;

  // Assign new ID to Article's Object
  const newArticle = Object.assign(article, {
    _id: newId,
  });

  // Save Article to Database
  await saveArticle(newArticle);
};

// ============================= Find Article ===============================

const findArticle = async (filter) => {
  return await articleDatabase.findOne(filter);
};

// ============================= Update Article =============================

const updateArticle = async (id, update) => {
  return await articleDatabase.findByIdAndUpdate(id, update);
};

// ============================= Delete Article =============================

const deleteArticle = async (id) => {
  return await articleDatabase.findByIdAndDelete(id);
};

// ========================== Export All Functions ==========================

module.exports = {
  getAllArticles,
  createNewArticle,
  getArticleById,
  findArticle,
  updateArticle,
  deleteArticle,
  getArticleList,
  getPublishedArticles,
  getTotalArticleList,
};

// ==========================================================================
