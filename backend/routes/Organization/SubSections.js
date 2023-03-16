const express = require('express');
const router = express.Router();
const needle = require('needle');

//global variables
const API_BASE_URL = process.env.API_BASE_URL;
const API_URL = API_BASE_URL + '/api/v1';
const DELETE_URL = API_BASE_URL + '/api/v1/subsection';

//get sub-sections
router.get('/', async (req, res) => {
  const options = {
    headers: {
      Authorization: req.header('Authorization'),
    },
  };
  try {
    await needle('get', `${API_URL}/subsection`, options)
      .then(response => {
        res.status(response.statusCode).json(response.body);
      })
      .catch(error => res.json(error));
  } catch (e) {
    res.json(e);
  }
});

//add section
router.post('/create', async (req, res) => {
  const options = {
    headers: {
      Authorization: req.header('Authorization'),
    },
    json: true,
  };
  const formData = req.body;
  try {
    await needle('post', `${API_URL}/subsection`, formData, options)
      .then(response => {
        res.status(response.statusCode).json(response.body);
      })
      .catch(error => res.json(error));
  } catch (e) {
    res.status(500).json(e);
  }
});
//update section
router.post('/update', async (req, res) => {
  try {
    const formData = req.body;
    const options = {
      headers: {
        Authorization: req.header('Authorization'),
      },
      json: true,
    };
    const url = `${API_URL}/subsection/${formData.id}`;
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

// DELETE SUB-SECTION
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
