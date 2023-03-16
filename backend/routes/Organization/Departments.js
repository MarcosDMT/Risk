const express = require('express');
const router = express.Router();
const needle = require('needle');
const { json } = require('express');
const SimpleCrypto = require('simple-crypto-js').default;

//global variables
const API_BASE_URL = process.env.API_BASE_URL;
const API_URL = API_BASE_URL + '/api/v1';
const DELETE_URL = API_BASE_URL + '/api/v1/departments';

//GET DEPARTMENTS
router.get('/', async (req, res) => {
  const options = {
    headers: {
      Authorization: req.header('Authorization'),
    },
  };
  const secretKey = new SimpleCrypto('888');
  const cipherText = secretKey.encrypt(req.header('Authorization'));
  try {
    await needle('get', `${API_URL}/departments`, options)
      .then(response => {
        res.status(response.statusCode).json(response.body);
        console.log(cipherText);
        console.log(secretKey.decrypt(cipherText));
      })
      .catch(error => res.json(error));
  } catch (e) {
    res.json(e);
  }
});

//ADD DEPARTMENT
router.post('/create', async (req, res) => {
  const options = {
    headers: {
      Authorization: req.header('Authorization'),
    },
    json: true,
  };
  const formData = req.body;
  try {
    await needle('post', `${API_URL}/departments`, formData, options)
      .then(response => {
        res.status(response.statusCode).json(response.body);
      })
      .catch(error => res.json(error));
  } catch (e) {
    res.status(500).json(e);
  }
});
//UPDATE DEPARTMENT
router.post('/update', async (req, res) => {
  try {
    const formData = req.body;
    const options = {
      headers: {
        Authorization: req.header('Authorization'),
      },
      json: true,
    };
    const url = `${API_URL}/departments/${formData.id}`;
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

// DELETE DEPARTMENT
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
