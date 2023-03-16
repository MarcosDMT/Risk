const express = require("express");
const router = express.Router();
const needle = require("needle");

//global variables
const API_BASE_URL = process.env.API_BASE_URL;
const API_URL = API_BASE_URL + "/api";

//get roles
router.get("/", async (req, res) => {
  const options = {
    headers: {
      Authorization: req.header("Authorization"),
      Company: req.header("Company")
    }
  };
  try {
    console.log(req.header("Company"));
    await needle("get", `${API_URL}/roles`, options)
      .then(response => {
        res.status(response.statusCode).json(response.body);
      })
      .catch(error => res.json(error));
  } catch (e) {
    res.json(e);
  }
});

//get roles permissions
router.get("/actions", async (req, res) => {
  const options = {
    headers: {
      Authorization: req.header("Authorization")
    }
  };
  try {
    await needle("get", `${API_URL}/roles/actions`, options)
      .then(response => {
        res.status(response.statusCode).json(response.body);
      })
      .catch(error => res.json(error));
  } catch (e) {
    res.json(e);
  }
});

//add section
router.post("/create", async (req, res) => {
  const options = {
    headers: {
      Authorization: req.header("Authorization"),
      Company: req.header("Company")
    },
    json: true
  };
  const formData = req.body;
  try {
    await needle("post", `${API_URL}/roles`, formData, options)
      .then(response => {
        res.status(response.statusCode).json(response.body);
      })
      .catch(error => res.json(error));
  } catch (e) {
    res.status(500).json(e);
  }
});
//update section
router.post("/update", async (req, res) => {
  try {
    const formData = req.body;
    const options = {
      headers: {
        Authorization: req.header("Authorization"),
        Company: req.header("Company")
      },
      json: true
    };
    const url = `${API_URL}/roles/${formData.roleId}/permissions`;
    await needle("put", url, formData, options)
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
