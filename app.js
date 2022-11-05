// =================== Blog App =======================

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// ====================================================

const { api } = require("./routes/api");

// ====================================================

const app = express();

// ====================================================

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cookieParser());

// ====================================================

app.use("/api/v1", api);

// ====================================================

module.exports = app;

// ====================================================
