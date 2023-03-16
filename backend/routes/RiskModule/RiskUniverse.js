const express = require('express');
const router = express.Router();
const needle = require('needle');

//global variables
const API_BASE_URL = process.env.API_BASE_URL;
const API_URL = API_BASE_URL + '/api/v1/riskuniverse';
const CALCULATE_URL = API_BASE_URL + '/api/v1/residualrisk';
const CALCULATE_RESIDUAL = API_BASE_URL + '/api/v1/residualrisk/calculate';

//GET RISK UNIVERSES
router.get('/', async (req, res) => {
  const options = {
    headers: {
      Authorization: req.header('Authorization'),
    },
  };
  try {
    await needle('get', `${API_URL}/all`, options)
      .then(response => {
        res.status(response.statusCode).json(response.body);
      })
      .catch(error => res.json(error));
  } catch (e) {
    res.json(e);
  }
});

// GET RISK APPROVALS
router.get('/approvals', async (req, res) => {
  const options = {
    headers: {
      Authorization: req.header('Authorization'),
    },
  };
  try {
    await needle('get', `${API_URL}/approvals`, options)
      .then(response => {
        res.status(response.statusCode).json(response.body);
      })
      .catch(error => res.json(error));
  } catch (e) {
    res.json(e);
  }
});

router.get('/template', async (req, res) => {
  const options = {
    headers: {
      Authorization: req.header('Authorization'),
    },
  };
  try {
    await needle('get', `${API_URL}/template`, options)
      .then(response => {
        res.status(response.statusCode).json(response.body);
      })
      .catch(error => res.json(error));
  } catch (e) {
    res.json(e);
  }
});

router.get('/uploadeddocs', async (req, res) => {
  const options = {
    headers: {
      Authorization: req.header('Authorization'),
    },
  };
  try {
    await needle('get', `${API_URL}/uploadeddocs`, options)
      .then(response => {
        res.status(response.statusCode).json(response.body);
      })
      .catch(error => res.json(error));
  } catch (e) {
    res.json(e);
  }
});

//ADD RISK UNIVERSE
router.post('/create', async (req, res) => {
  const options = {
    headers: {
      Authorization: req.header('Authorization'),
    },
    json: true,
  };
  const formData = req.body;
  try {
    await needle('post', `${API_URL}`, formData, options)
      .then(response => {
        res.status(response.statusCode).json(response.body);
      })
      .catch(error => res.json(error));
  } catch (e) {
    res.status(500).json(e);
  }
});

//UPLOAD DOCUMENT
router.post('/upload', async (req, res) => {
  const options = {
    headers: {
      Authorization: req.header('Authorization'),
    },
    json: true,
  };
  const formData = req.body;
  try {
    await needle('post', `${API_URL}/upload`, formData, options)
      .then(response => {
        res.status(response.statusCode).json(response.body);
      })
      .catch(error => res.json(error));
  } catch (e) {
    res.status(500).json(e);
  }
});

// Uncreated Documents
router.post('/uncreated', async (req, res) => {
  const options = {
    headers: {
      Authorization: req.header('Authorization'),
    },
    json: true,
  };
  const formData = req.body;
  try {
    await needle('post', `${API_URL}/uncreated`, formData, options)
      .then(response => {
        res.status(response.statusCode).json(response.body);
      })
      .catch(error => res.json(error));
  } catch (e) {
    res.status(500).json(e);
  }
});

//UPDATE RISK UNIVERSE
router.post('/update', async (req, res) => {
  try {
    const formData = req.body;
    const options = {
      headers: {
        Authorization: req.header('Authorization'),
      },
      json: true,
    };
    const url = `${API_URL}`;
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

//UPDATE UPLOADED RISK
router.put('/updatedUploads', async (req, res) => {
  try {
    const formData = req.body;
    const options = {
      headers: {
        Authorization: req.header('Authorization'),
      },
      json: true,
    };
    const url = `${API_URL}/update/${formData.id}`;
    console.log(url);
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

// APPROVE RISK
router.post('/approve', async (req, res) => {
  try {
    const formData = req.body;
    const options = {
      headers: {
        Authorization: req.header('Authorization'),
      },
      json: true,
    };
    const url = `${API_URL}/approve/${formData.id}`;
    console.log(url);
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

// CREATE BULK RISK
router.post('/import', async (req, res) => {
  try {
    const formData = req.body;
    const options = {
      headers: {
        Authorization: req.header('Authorization'),
      },
      json: true,
    };
    const url = `${API_URL}/import`;
    console.log(url);
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

// CALCULATE INHERENT
router.post('/assess', async (req, res) => {
  try {
    const formData = req.body;
    console.log('formmdata', formData);
    const options = {
      headers: {
        Authorization: req.header('Authorization'),
      },
      json: true,
    };
    const url = `${CALCULATE_URL}/calculate`;
    console.log('CALCULATE ', url);
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


// CALCULATE RESIDUAL
router.post('/calculate', async (req, res) => {
  try {
    const formData = req.body;
    console.log('formmdata', formData);
    const options = {
      headers: {
        Authorization: req.header('Authorization'),
      },
      json: true,
    };
    const url = `${CALCULATE_RESIDUAL}/residualrisk`;
    console.log('CALCULATE ', url);
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

// DELETE RISK
router.post('/delete', async (req, res) => {
  try {
    const formData = req.body;
    const options = {
      headers: {
        Authorization: req.header('Authorization'),
      },
      json: true,
    };
    const url = `${API_URL}/${formData.id}`;
    console.log('RISK ', url);
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
