const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

//Set the Port
const PORT = process.env.PORT || 5002;
const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
// parse application/json
app.use(bodyParser.json());

//api routes
app.use("/api", require("./routes"));

//application routes
app.get("/*", function(req, res){
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
