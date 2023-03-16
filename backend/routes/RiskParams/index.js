const express = require("express");
const app = express();

//auth routes
app.use("/risk-controls", require("./ControlCategories"));
app.use("/risk-categories", require("./RiskCategories"));
app.use("/risk-probability", require("./Probability"));
app.use("/risk-severity", require("./Severity"));
app.use("/loss-types", require("./LossTypes"));
app.use("/matrix", require("./ProbablitySeverityMatrix"));

module.exports = app;
