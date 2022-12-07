const db = {
  user: [
    { id: 1, name: 'Carlos'},
  ],
};

async function list(table) {
  return db[table];
}

async function get (table, id) {
  let collection = await list(table);
  return collection.find(item => item.id == id) || null
}

async function upsert(table, data) {
  db[table].push(data);
}

async function remove(table, id) {
  delete db[table];
  return true;
}

module.exports = {
  list,
  get,
  upsert,
  remove
}