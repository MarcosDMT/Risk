const express = require("express");
const app = express();

//auth routes
app.use("/auth", require("./Auth"));

module.exports = app;
