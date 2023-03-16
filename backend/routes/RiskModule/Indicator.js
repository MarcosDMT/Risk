const express = require("express");
const router = express.Router();
const needle = require("needle");

//global variables
const API_BASE_URL = process.env.API_BASE_URL;
const API_URL = API_BASE_URL + "/api/v1/keyriskindicator";


// FETCH RISK INDICATORS
router.get("/", async (req, res) => {
  const options = {
    headers: {
      Authorization: req.header("Authorization"),
    }
  };
  try {
    await needle("get", `${API_URL}`, options)
      .then(response => {
        res.status(response.statusCode).json(response.body);
      })
      .catch(error => res.json(error));
  } catch (e) {
    res.json(e);
  }
});

// FETCH INDICATOR HISTORY
router.post("/history", async (req, res) => {
  const options = {
    headers: {
      Authorization: req.header("Authorization"),
    },
    json: true,
  };
  const formData = req.body;
  try {
    await needle("get", `${API_URL}/${formData.id}`, options)
      .then(response => {
        res.status(response.statusCode).json(response.body);
      })
      .catch(error => res.json(error));
  } catch (e) {
    res.json(e);
  }
});

module.exports = router;
