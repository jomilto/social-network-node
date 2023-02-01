const auth = require('../../../auth');
const bcrypt = require("bcrypt");

const TABLE = 'auth';

module.exports = function(injectedStore) {
  let store = injectedStore;
  if (!store) store = require('../../../store/dummy');

  async function login(username, password) {
    const data = await store.query(TABLE, { username });
    if (data && await bcrypt.compare(password,data.password)) {
      delete data.password;
      return auth.sign({...data});
    }
    else {
      throw new Error('Invalid Credentials');
    }
  }

 async function upsert(data, createRecord) {
  const authData = {
    id: data.id,
  }
  if (data.username) {
    authData.username = data.username
  }
  if (data.password) {
    authData.password = await bcrypt.hash(data.password, 5);
  }

  return store.upsert(TABLE, authData, createRecord);
 }

 async function remove(id) {
  return store.remove(TABLE, id);
 }

 return {
  login,
  upsert,
  remove
 };
}