const express = require("express");
const app = express();

//auth routes
app.use("/root-causes", require("./RiskCauses"));
app.use("/risk-owner", require("./RiskOwners"));
app.use("/risk-universe", require("./RiskUniverse"));
app.use("/risk-incident", require("./Incident"));
app.use("/risk-indicator", require("./Indicator"));

module.exports = app;
