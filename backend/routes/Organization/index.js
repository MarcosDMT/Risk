const express = require("express");
const app = express();

//auth routes
app.use("/subsidiaries", require("./Subsidiaries"));
app.use("/departments", require("./Departments"));
app.use("/sections", require("./Sections"));
app.use("/sub-sections", require("./SubSections"));

module.exports = app;
