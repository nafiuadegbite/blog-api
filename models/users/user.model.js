// ======================= User Database Model ========================

const { hashPassword } = require("../../middleware/auth");
const userDatabase = require("./user.mongo");

// Default ID
const DEFAULT_ID = 0;

// ========================== GET All Users ===========================

const getAllUsers = async (skip, limit) => {
  return await userDatabase
    .find(
      {},
      {
        __v: 0,
      }
    )
    .sort({ _id: 1 })
    .skip(skip)
    .limit(limit);
};

// ======================== GET Each User By ID =======================

const getUserById = async (id) => {
  return await userDatabase
    .findById(id, { password: 0, __v: 0 })
    .populate("articles", { title: 1, body: 1 });
};

// =========================== Find User ==============================

const findUser = async (filter) => {
  return await userDatabase.findOne(filter);
};

// ================= Add Created Article to Author ====================

const addArticle = async (id, update) => {
  return await userDatabase.findByIdAndUpdate(id, {
    $push: { articles: [update] },
  });
};

// ===================== Delete Article to Author =====================

const deleteArticleFromAuthor = async (id, update) => {
  return await userDatabase.updateOne(
    { _id: id },
    { $pull: { articles: update } }
  );
};

// ================ Save User's Detail to Database ====================

const saveUser = async (user) => {
  await userDatabase.findOneAndUpdate({ _id: user._id }, user, {
    upsert: true,
  });
};

// ====================== Get Latest User's ID ========================

const getUserId = async () => {
  const latestUser = await userDatabase.findOne().sort("-_id");

  if (!latestUser) {
    return DEFAULT_ID;
  }

  return latestUser._id;
};

// ========================= Register User ============================

const register = async (user) => {
  // Set new ID for User
  const newId = (await getUserId()) + 1;
  // Hash User's Password with Bcrypt
  const newPassword = await hashPassword(user.password);

  // Assign new ID and Password to User's Object
  const newUser = Object.assign(user, {
    _id: newId,
    password: newPassword,
  });

  // Save User to Database
  await saveUser(newUser);
};

// ======================= Update User Details ========================

const updateUser = async (id, update) => {
  return await userDatabase.findByIdAndUpdate(id, update);
};

// ======================= Export All Functions =======================

module.exports = {
  getAllUsers,
  register,
  findUser,
  getUserById,
  addArticle,
  deleteArticleFromAuthor,
  updateUser
};

// ====================================================================
