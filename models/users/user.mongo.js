const { Schema, model } = require("mongoose");
const mongoosePaginate = require('mongoose-paginate');

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
    match: [
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      "Please add a valid email",
    ],
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


UserSchema.plugin(mongoosePaginate);
module.exports = new model("User", UserSchema);
