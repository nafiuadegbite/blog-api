const express = require("express");
const { httpGet } = require("./app.controller");

const appRouter = express.Router();

appRouter.get("/", httpGet);

module.exports = { appRouter };
