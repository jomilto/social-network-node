const express = require('express');

const response = require('../../../network/response');
const controller = require('./index');

const router = express.Router();

router.post('/login', async function(req, res) {
  try {
    const { username, password } = req.body;
    const token = await controller.login(username, password);
    response.success(req, res, token, 200);
  }
  catch (error) {
    response.error(req, res, error.message, 500);
  }  
 
});

module.exports = router;