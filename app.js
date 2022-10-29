const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const { appRouter } = require("./routes/app.router");

const app = express();

app.use(morgan("combined"));
app.use(bodyParser.json());

app.use(appRouter);

module.exports = app;
