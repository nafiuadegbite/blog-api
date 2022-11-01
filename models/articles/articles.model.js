const articleDatabase = require("./articles.mongo");

const DEFAULT_ID = 0;

const getAllArticles = async (skip, limit) => {
  return await articleDatabase
    .find(
      {},
      {
        __v: 0,
      }
    )
    .populate("author", { _id: 0, first_name: 1, last_name: 1 })
    .sort({ _id: 1 })
    .skip(skip)
    .limit(limit);
};

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

const getArticleId = async () => {
  const latestArticle = await articleDatabase.findOne().sort("-_id");

  if (!latestArticle) {
    return DEFAULT_ID;
  }

  return latestArticle._id;
};

const findArticle = async (filter) => {
  const result = await articleDatabase.findOne(filter);

  return result;
};

const updateArticleToPublished = async (id) => {
  return await articleDatabase.findByIdAndUpdate(id, { state: "published" });
};

const createNewArticle = async (article) => {
  const newId = (await getArticleId()) + 1;

  const newArticle = Object.assign(article, {
    _id: newId,
  });

  await saveArticle(newArticle);
};

module.exports = {
  getAllArticles,
  createNewArticle,
  getArticleById,
  findArticle,
  updateArticleToPublished,
};
