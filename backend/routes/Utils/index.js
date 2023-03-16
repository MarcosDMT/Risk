const express = require("express");
const router = express.Router();
const needle = require("needle");

//global variables
const API_BASE_URL = process.env.API_BASE_URL;
const API_URL = API_BASE_URL + "/api/v1";

const currencies = [
  {id: 1, name: "KES"},
  {id: 2, name: "USD"},
  {id: 3, name: "EURO"}
];
const priorities = [
  {id: 1, name: "Low"},
  {id: 2, name: "Medium"},
  {id: 3, name: "High"}
];
const caseTypes = [ {id: 1, name: "Internal"}, {id: 2, name: "External"} ];

//get risk frequencies
router.get("/frequency/risk", async (req, res) => {
  const options = {
    headers: {
      Authorization: req.header("Authorization")
    }
  };
  try {
    await needle("get", `${API_URL}/keyfrequency/risk`, options)
      .then(response => {
        res.status(response.statusCode).json(response.body);
      })
      .catch(error => res.json(error));
  } catch (e) {
    res.json(e);
  }
});
//get compliance frequencies
router.get("/frequency/compliance", async (req, res) => {
  const options = {
    headers: {
      Authorization: req.header("Authorization")
    }
  };
  try {
    await needle("get", `${API_URL}/keyfrequency/compliance`, options)
      .then(response => {
        res.status(response.statusCode).json(response.body);
      })
      .catch(error => res.json(error));
  } catch (e) {
    res.json(e);
  }
});
//get currencies
router.get("/currencies", async (req, res) => {
  // const options = {
  //     headers: {
  //         Authorization : req.header('Authorization')
  //     }
  // }
  // try{
  //     await needle('get',`${API_URL}/keyfrequency/compliance`, options).then(response => {
  //         res.status(response.statusCode).json(response.body);
  //     }).catch(error => res.json(error))
  //
  // } catch (e) {
  //     res.json(e)
  // }
  res.json(currencies);
});
//get priorities
router.get("/priorities", async (req, res) => {
  // const options = {
  //     headers: {
  //         Authorization : req.header('Authorization')
  //     }
  // }
  // try{
  //     await needle('get',`${API_URL}/keyfrequency/compliance`, options).then(response => {
  //         res.status(response.statusCode).json(response.body);
  //     }).catch(error => res.json(error))
  //
  // } catch (e) {
  //     res.json(e)
  // }
  res.json(priorities);
});
//get case-types
router.get("/case-types", async (req, res) => {
  // const options = {
  //     headers: {
  //         Authorization : req.header('Authorization')
  //     }
  // }
  // try{
  //     await needle('get',`${API_URL}/keyfrequency/compliance`, options).then(response => {
  //         res.status(response.statusCode).json(response.body);
  //     }).catch(error => res.json(error))
  //
  // } catch (e) {
  //     res.json(e)
  // }
  res.json(caseTypes);
});

router.get("/risk-appetite-types", async (req, res) => {
  const options = {
    headers: {
      Authorization: req.header("Authorization")
    }
  };
  try {
    await needle("get", `${API_URL}/riskappetitetype`, options)
      .then(response => {
        res.status(response.statusCode).json(response.body);
      })
      .catch(error => res.json(error));
  } catch (e) {
    res.json(e);
  }
});
module.exports = router;
