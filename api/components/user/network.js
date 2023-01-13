const express = require('express');

const secure = require("./secure");
const response = require('../../../network/response');
const controller = require('./index');

const router = express.Router();

router.get('/', list);
router.get('/:id', get);
router.post('/', upsert);
router.put('/', secure("update"), upsert);

async function get(req, res) {
  try {
    const user = await controller.get(req.params.id);
    response.success(req, res, user, 200);
  }
  catch (error) {
    response.error(req, res, error.message, 500);
  }  
}

async function list(req, res) {
  try {
    const list = await controller.list();
    response.success(req, res, list, 200);
  }
  catch (error) {
    response.error(req, res, error.message, 500);
  }
}

async function upsert(req, res) {
  try {
    const user = await controller.upsert(req.body);
    response.success(req, res, user, 201);
  }
  catch (error) {
    response.error(req, res, error.message, 500);
  }
}

module.exports = router;