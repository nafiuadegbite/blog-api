// =============== MongoDB CONNECTION ===============

const mongoose = require("mongoose");

// Import dotenv config
require("dotenv").config();

// Mongo URL Connection String
const MONGO_URL = process.env.MONGO_URL;

// Alert successful connection
mongoose.connection.once("open", () => {
  console.log("MongoDB connection is ready!");
});

// Alert error
mongoose.connection.on("error", (err) => {
  console.log(err);
});

// Mongo connect
const mongoConnect = async () => {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

// Mongo disconnect
const mongoDisconnect = async () => {
  await mongoose.disconnect();
};

// ==================================================

module.exports = { mongoConnect, mongoDisconnect };

// ==================================================
