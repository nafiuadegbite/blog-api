const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userDatabase = require("./user.mongo");

const DEFAULT_ID = 0;

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

const getUserById = async (id) => {
  return await userDatabase
    .findById(id, { password: 0, __v: 0 })
    .populate("articles", { title: 1, _id: 0 });
};

const findProperty = async (filter) => {
  const result = await userDatabase.findOne(filter);

  return result;
};

const addArticle = async (id, update) => {
  return await userDatabase.findByIdAndUpdate(id, {
    $push: { articles: [update] },
  });
};

const isValidPassword = async (enteredPassword, comparePassword) => {
  return await bcrypt.compare(enteredPassword, comparePassword);
};

const saveUser = async (user) => {
  await userDatabase.findOneAndUpdate({ _id: user._id }, user, {
    upsert: true,
  });
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};

const getUserId = async () => {
  const latestUser = await userDatabase.findOne().sort("-_id");

  if (!latestUser) {
    return DEFAULT_ID;
  }

  return latestUser._id;
};

const createNewUser = async (user) => {
  const newId = (await getUserId()) + 1;
  const newPassword = await hashPassword(user.password);

  const newUser = Object.assign(user, {
    _id: newId,
    password: newPassword,
  });

  await saveUser(newUser);
};

module.exports = {
  getAllUsers,
  createNewUser,
  findProperty,
  isValidPassword,
  getUserById,
  addArticle,
};
