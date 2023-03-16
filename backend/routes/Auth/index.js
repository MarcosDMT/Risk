const express = require("express");
const router = express.Router();
const needle = require("needle");
const {json} = require("express");
const SimpleCrypto = require("simple-crypto-js").default;

//global variables
const API_BASE_URL = process.env.API_BASE_URL;
const API_URL = API_BASE_URL + "/api";

//generate token
router.post("/login", async (req, res) => {
  try {
    const body = req.body;
    const secretKey = new SimpleCrypto(body.email);
    const password = secretKey.decrypt(body.password);
    const formData = {
      email: body.email.toString(),
      password: password.toString()
    };
    const getTenantUrl = `${API_URL}/tokens/gettenant/${formData.email}`;

    console.log(getTenantUrl);

    await needle("get", getTenantUrl)
      .then(async response => {
        if (response.statusCode === 200) {
          const url = `${API_URL}/tokens?tenant=${response.body}`;
          await needle("post", `${url}`, formData, {json: true})
            .then(response => {
              console.log(response.body);
              console.log(formData);
              res.status(response.statusCode).json(response.body);
            })
            .catch(error => {
              res.status(500).json(error);
              console.log(error);
            });
        } else {
          res.status(response.statusCode).json(response.body);
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  } catch (e) {
    res.status(500).json(e);
  }
});

//refresh token
router.post("/refresh-token", async (req, res) => {
  const body = req.body;
  const formData = {
    token: body.token,
    refreshToken: body.refreshToken
  };
  try {
    await needle(
      "post",
      `${API_URL}/tokens/refresh?tenant=${body.tenant}`,
      formData,
      {json: true}
    )
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

//get user details
router.get("/user-permissions/", async (req, res) => {
  const options = {
    headers: {
      Authorization: req.header("Authorization")
    }
  };
  try {
    const userId = req.query.id;
    const url = `${API_URL}/users/${userId}/roles`;

    await needle("get", `${url}`, options)
      .then(async response => {
        if (response.statusCode === 200) {
          const data = response.body;
          await needle(
            "get",
            `${API_URL}/roles/${data[0].roleId}/permissions`,
            options
          )
            .then(response => {
              res.status(response.statusCode).json(response.body);
            })
            .catch(e => res.status(500).json(e));
        } else {
          res.status(response.statusCode).json(response.body);
        }
      })
      .catch(error => res.json(error));
  } catch (e) {
    res.json(e);
  }
});

module.exports = router;
