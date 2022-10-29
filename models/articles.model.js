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
    .sort({ flightNumber: 1 })
    .skip(skip)
    .limit(limit);
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

const createNewArticle = async (article) => {
  const newId = (await getArticleId()) + 1;

  const newArticle = Object.assign(article, {
    _id: newId,
  });

  await saveArticle(newArticle);
};

module.exports = { getAllArticles, createNewArticle };
