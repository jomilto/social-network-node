const auth = require('../auth');
const crypto = require('crypto').webcrypto;
const TABLE = 'user';

module.exports = function(injectedStore) {
  let store = injectedStore;
  if (!store) store = require('../../../store/dummy');

  function list() {
    return store.list(TABLE);
  }

  function get(id) {
    return store.get(TABLE,id);
  }

  async function upsert(body) {
    let createRecord = false;
    const user = {
      name: body.name,
      username: body.username,
    }

    if (body.id) {
      user.id = body.id;
    }
    else {
      user.id = crypto.randomUUID();
      createRecord = true;
    }

    if (body.password || body.username) {
      await auth.upsert({
        id: user.id,
        username: body.username,
        password: body.password
      }, createRecord)
    }
    return store.upsert(TABLE, user, createRecord);
  }

  async function remove(id) {
     return await auth.remove(id) && await store.remove(TABLE, id);
  }

  async function follow(from, to) {
    return store.upsert(TABLE + "_follow", {
      user_from: from,
      user_to: to
    }, true);
  }

  async function following(user) {
    const join = {};
    join[TABLE] = "user_to";
    const query = { user_from: user };

    return await store.query(TABLE + '_follow', query, join);
  }

  return {
    list,
    get,
    upsert,
    remove,
    follow,
    following,
  }
}