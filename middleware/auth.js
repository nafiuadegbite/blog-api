// =================== Auth Middleware =====================
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users/user.mongo");

//================== Protect Routes ========================

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.token) {
    // Set token from cookie
    token = req.cookies.token;
  }
  // Make sure token exists
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
};

// ===================== Create TOKEN =======================

const getSignedJwtToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// ===================== Get TOKEN ==========================

const sendTokenResponse = (id, statusCode, res) => {
  const token = getSignedJwtToken(id);

  // token expires in 1hour
  const options = {
    expires: new Date(Date.now() + 3600 * 1000),
    httpOnly: true,
  };
  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: "true", token });
};

// ================ Hash Password with Bcrypt ===============

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};

// ===================== Validate Password ==================

const isValidPassword = async (enteredPassword, comparePassword) => {
  return await bcrypt.compare(enteredPassword, comparePassword);
};

// ===================== Validate Email =====================

const validateEmail = (email) => {
  const res =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return res.test(String(email).toLowerCase());
};

// ==================== Export All Functions ================

module.exports = {
  protect,
  sendTokenResponse,
  getSignedJwtToken,
  hashPassword,
  isValidPassword,
  validateEmail,
};

// ===========================================================
