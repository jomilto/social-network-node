const crypto = require('crypto').webcrypto;
const TABLE = 'post';

module.exports = function(injectedStore) {
  let store = injectedStore;
  if (!store) store = require('../../../store/dummy');

  function list() {
    return store.list(TABLE);
  }

  async function get(id) {
    return await store.get(TABLE,id);
  }

  async function upsert(body, author) {
    let createRecord = false;
    const post = {
      text: body.text,
      author
    }

    if (body.id) {
      post.id = body.id;
    }
    else {
      post.id = crypto.randomUUID();
      createRecord = true;
    }

    return store.upsert(TABLE, post, createRecord);
  }

  async function remove(id) {
    return store.remove(TABLE, id);
  }

  async function postedBy(author) {
    const query = { author };
    const join = {};
    join["user"] = "author";
    return await store.query(TABLE, query);
  }

  return {
    list,
    get,
    remove,
    upsert,
    postedBy
  }
}