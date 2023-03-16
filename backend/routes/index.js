const express = require("express");
const app = express();

//auth routes
app.use("/auth", require("./Auth"));
app.use("/users", require("./Users"));
app.use("/organization", require("./Organization"));
app.use("/risk-params", require("./RiskParams"));
app.use("/roles", require("./Roles"));
app.use("/compliance", require("./Compliance"));
app.use("/utils", require("./Utils"));
app.use("/risk", require("./RiskModule"));
app.use("/dashboard", require("./Dashboard"));

module.exports = app;
