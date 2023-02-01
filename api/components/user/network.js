const express = require('express');

const secure = require("./secure");
const response = require('../../../network/response');
const controller = require('./index');

const router = express.Router();

router.get('/', list);
router.get('/:id', get);
router.post('/follow/:id', secure("follow"), follow);
router.post('/', upsert);
router.put('/', secure("update"), upsert);
router.delete('/', secure("remove"), remove);

async function get(req, res, next) {
  try {
    const user = await controller.get(req.params.id);
    response.success(req, res, user, 200);
  }
  catch (error) {
    next(error);
  }  
}

async function list(req, res, next) {
  try {
    const list = await controller.list();
    response.success(req, res, list, 200);
  }
  catch (error) {
    next(error);
  }
}

async function upsert(req, res, next) {
  try {
    const user = await controller.upsert(req.body);
    response.success(req, res, user, 201);
  }
  catch (error) {
    next(error);
  }
}

async function remove(req, res, next) {
  try {
   const { id } = req.body;
   const deleted = await controller.remove(id);
   response.success(req, res, deleted, 200);
  }
  catch (error) {
    next(error);
  }
}

async function follow(req, res, next) {
  try {
    const { id } = req.params;
    const result = await controller.follow(req.user.id, id);
    response.success(req, res, `User ${req.user.id} is following ${id}`, 200);
  } catch (error) {
    next(error);
  }
}

module.exports = router;