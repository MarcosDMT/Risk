const express = require("express");
const app = express();

//auth routes
app.use("/legal", require("./LegalCompliance"));
app.use("/enterprise", require("./EnterpriseCompliance"));
app.use("/statutory", require("./StatutoryCompliance"));

module.exports = app;
