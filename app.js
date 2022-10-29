const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const { api } = require("./routes/api");

const app = express();

app.use(morgan("combined"));
app.use(bodyParser.json());

app.use("/v1", api);

module.exports = app;
