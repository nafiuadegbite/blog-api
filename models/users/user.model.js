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

const findProperty = async (filter) => {
  const result = await userDatabase.findOne(filter);

  return result;
};

const getSignedJwtToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const sendTokenResponse = (id, statusCode, res) => {
  const token = getSignedJwtToken(id);

  const options = {
    expires: new Date(Date.now() + 3600 * 1000),
    httpOnly: true,
  };
  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: "true", token });
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
  getSignedJwtToken,
  isValidPassword,
  sendTokenResponse,
};
