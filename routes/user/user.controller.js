const { use } = require("passport");
const {
  getAllUsers,
  createNewUser,
  findProperty,
  getSignedJwtToken,
  isValidPassword,
  sendTokenResponse,
} = require("../../models/users/user.model");
const getPagination = require("../../services/query");
const errorHandler = require("../../utils/errorResponse");

const httpGetAllUsers = async (req, res) => {
  const { skip, limit } = getPagination(req.query);
  const users = await getAllUsers(skip, limit);

  res.status(200).json(users);
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
      res.status(401).json({ message: "Invalid Credentials" });
    }

    const isValid = await isValidPassword(password, user.password);

    if (!isValid) {
      res.status(401).json({ message: "Invalid Credentials" });
    }

    sendTokenResponse(user._id, 200, res);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { httpGetAllUsers, httpCreateUser, findUser, httpLogin };
