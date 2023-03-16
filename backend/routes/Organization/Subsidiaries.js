const express = require('express');
const router = express.Router();
const needle = require('needle');
const { json } = require('express');
const { default: SimpleCrypto } = require('simple-crypto-js').default;

//global variables
const API_BASE_URL = process.env.API_BASE_URL;
const API_URL = API_BASE_URL + '/api/v1';
const DELETE_URL = API_BASE_URL + '/api/v1/company';
const FILTER_URL = API_BASE_URL + '/api/v1/universedashboard/risksummary';


//get all records
router.get('/', async (req, res) => {
  const options = {
    headers: {
      Authorization: req.header('Authorization'),
    },
  };
  try {
    await needle('get', `${API_URL}/company`, options)
      .then(response => {
        res.status(response.statusCode).json(response.body);
      })
      .catch(error => res.json(error));
  } catch (e) {
    res.json(e);
  }
});
//create a new record
router.post('/create', async (req, res) => {
  try {
    const formData = req.body;
    const options = {
      headers: {
        Authorization: req.header('Authorization'),
      },
      json: true,
    };
    const url = `${API_URL}/company`;
    await needle('post', url, formData, options)
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
//update a record
router.post('/update', async (req, res) => {
  try {
    const formData = req.body;
    const options = {
      headers: {
        Authorization: req.header('Authorization'),
      },
      json: true,
    };
    const url = `${API_URL}/company/${formData.id}`;
    await needle('put', url, formData, options)
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


// Delete Subsidiary
router.post('/delete', async (req, res) => {
  try {
    const formData = req.body;
    const options = {
      headers: {
        Authorization: req.header('Authorization'),
      },
      json: true,
    };
    const url = `${DELETE_URL}/${formData.id}`;
    console.log('URL  ', url);
    await needle('delete', url, formData, options)
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
