// ====================== User Schema =====================

const { Schema, model } = require("mongoose");

// ========================================================
const UserSchema = new Schema({
  _id: {
    type: Number,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
  articles: [
    {
      type: Number,
      ref: "Article",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// ========================================================

module.exports = new model("User", UserSchema);

// ========================================================
