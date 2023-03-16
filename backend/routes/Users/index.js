const express = require('express');
const router = express.Router();
const needle = require('needle');
const { json } = require('express');

//global variables
const API_BASE_URL = process.env.API_BASE_URL;
const API_URL = API_BASE_URL + '/api/users';
//get users
router.get('/', async (req, res) => {
  try {
    const options = {
      headers: {
        Authorization: req.header('Authorization'),
      },
    };
    await needle('get', `${API_URL}`, options)
      .then(response => {
        res.status(response.statusCode).json(response.body);
      })
      .catch(error => res.json(error));
  } catch (e) {
    res.json(e);
  }
});

//create user
router.post('/create', async (req, res) => {
  try {
    const formData = req.body;
    const options = {
      headers: {
        Authorization: req.header('Authorization'),
      },
      json: true,
    };
    const url = `${API_URL}`;
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
router.post('/update', async (req, res) => {
  try {
    const formData = req.body;
    const options = {
      headers: {
        Authorization: req.header('Authorization'),
      },
      json: true,
    };
    const url = `${API_URL}/update_user`;
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

router.post('/delete', async (req, res) => {
  try {
    const formData = req.body;
    const options = {
      headers: {
        Authorization: req.header('Authorization'),
      },
      json: true,
    };
    const url = `${API_URL}/${formData.userId}/toggle-status`;
    console.log('USER  ', url);
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

module.exports = router;
