// ================================= User Controller ================================

const {
  sendTokenResponse,
  isValidPassword,
  validateEmail,
} = require("../../middleware/auth");
const {
  getAllUsers,
  register,
  findUser,
  getUserById,
} = require("../../models/users/user.model");
const getPagination = require("../../services/query");

// ================================= GET All Users ==================================

// @desc      Get All Users
// @route     GET /api/v1/user
// @access    Private
const httpGetAllUsers = async (req, res) => {
  try {
    const { skip, limit } = getPagination(req.query);
    const users = await getAllUsers(skip, limit);

    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: "Bad Request" });
  }
};

// ================================= User's Profile =================================

// @desc      Get User's profile
// @route     GET /api/v1/user/profile
// @access    Private
const httpProfile = async (req, res) => {
  try {
    const user = await getUserById(req.user.id);

    return res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: "Bad Request" });
  }
};

// ==================================== Register ====================================

// @desc      Register
// @route     POST /api/v1/user/register
// @access    Public
const httpRegister = async (req, res) => {
  try {
    const user = req.body;

    // Check required properties
    if (!user.email || !user.password || !user.first_name || !user.last_name) {
      return res.status(400).json({
        error: "Missing required register property",
      });
    }

    // Validate email
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Enter a valid email address" });
    }

    const data = await findUser({ email: user.email });

    // Check if user already exist
    if (data) {
      return res.status(404).json({ message: "User already exists" });
    }

    // Save user to the database
    await register(user);

    // Send token
    sendTokenResponse(user._id, 200, res);
  } catch (error) {
    res.status(400).json({ message: "Bad Request" });
  }
};

// ==================================== Login =======================================

// @desc      Login
// @route     POST /api/v1/user/login
// @access    Public
const httpLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for required login proprerties
    if (!email || !password) {
      return res.status(400).json({
        error: "Missing required login property",
      });
    }

    // Validate email
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Enter a valid email address" });
    }

    const user = await findUser({ email });

    // Check if user exist
    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const isValid = await isValidPassword(password, user.password);

    // Check if password is valid
    if (!isValid) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    // Send token
    sendTokenResponse(user._id, 200, res);
  } catch (error) {
    res.status(400).json({ message: "Bad Request" });
  }
};

// ==================================== Logout ======================================

// @desc      Logout
// @route     GET /api/v1/user/logout
// @access    Public
const httpLogout = async (req, res) => {
  // Clear cookie
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({ message: "Logged out" });
};

// ============================== Export All Functions  =============================

module.exports = {
  httpGetAllUsers,
  httpProfile,
  httpRegister,
  httpLogin,
  httpLogout,
};

// ==================================================================================
