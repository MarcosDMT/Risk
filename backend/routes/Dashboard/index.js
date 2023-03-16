const express = require("express");
const router = express.Router();
const needle = require("needle");

//global variables
const API_BASE_URL = process.env.API_BASE_URL;
const API_URL = API_BASE_URL + "/api/v1/universedashboard";

// GET RISK UNIVERSEDASHBOARD DATA
router.post("/criteria", async (req, res) => {
  try {
    const formData = req.body;
    const options = {
      headers: {
        Authorization: req.header("Authorization")
      },
      json: true
    };
    const url = `${API_URL}/criteria/${formData.id}`;
    console.log(url);
    await needle("post", url, formData, options)
      .then(response => {
        res.status(response.statusCode).json(response.body);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  } catch (e) {
    res.status(500).json(e);
  }
});
router.get("/risksummary", async (req, res) => {
  try {
    const options = {
      headers: {
        Authorization: req.header("Authorization")
      },
      json: true
    };
    const url = `${API_URL}/risksummary`;
    await needle("post", url, {}, options)
      .then(response => {
        res.status(response.statusCode).json(response.body);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  } catch (e) {
    res.status(500).json(e);
  }
});
router.get("/compliancesummary", async (req, res) => {
  try {
    const options = {
      headers: {
        Authorization: req.header("Authorization")
      },
      json: true
    };
    const url = `${API_URL}/compliancesummary`;
    await needle("post", url, {}, options)
      .then(response => {
        res.status(response.statusCode).json(response.body);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  } catch (e) {
    res.status(500).json(e);
  }
});


router.get("/dashboard", async (req, res) => {
  try {
    const formData = req.body;
    const options = {
      headers: {
        Authorization: req.header("Authorization")
      },
      json: true
    };
    const url = `${API_URL}/risksummary/${formData.id}`;
    await needle("post", url, {}, options)
      .then(response => {
        res.status(response.statusCode).json(response.body);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
