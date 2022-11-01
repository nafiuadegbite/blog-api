const { use } = require("passport");
const { sendTokenResponse } = require("../../middleware/auth");
const {
  getAllUsers,
  createNewUser,
  findProperty,
  isValidPassword,
  getUserById,
} = require("../../models/users/user.model");
const getPagination = require("../../services/query");

const httpGetAllUsers = async (req, res) => {
  const { skip, limit } = getPagination(req.query);
  const users = await getAllUsers(skip, limit);

  res.status(200).json(users);
};

const httpGetUserbyId = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      error: "Please enter an id",
    });
  }

  const user = await getUserById(id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json({ data: user });
};

const httpCreateUser = async (req, res, next) => {
  try {
    const user = req.body;

    if (!user.email || !user.password || !user.first_name || !user.last_name) {
      return res.status(400).json({
        error: "Missing required signup property",
      });
    }

    const data = await findProperty({ email: user.email });

    if (data) {
      return res.status(404).json({ message: "User already exists" });
    }

    await createNewUser(user);
    sendTokenResponse(user._id, 200, res);
  } catch (error) {
    console.log(error);
  }
};

const findUser = async (req, res) => {
  const { email } = req.body;

  const data = await findProperty({ email: email });

  res.status(200).json(data);
};

const httpLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Missing required signup property",
      });
    }

    const user = await findProperty({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const isValid = await isValidPassword(password, user.password);

    if (!isValid) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    sendTokenResponse(user._id, 200, res);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  httpGetAllUsers,
  httpGetUserbyId,
  httpCreateUser,
  findUser,
  httpLogin,
};
