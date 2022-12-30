const db = {
  user: [
    { id: 1, name: 'Carlos'},
  ],
};

async function list(table) {
  return db[table] || [];
}

async function get (table, id) {
  let collection = await list(table);
  return collection.find(item => item.id == id) || null;
}

async function upsert(table, data) {
  if (!db[table]) db[table] = [];
  db[table].push(data);
}

async function remove(table, id) {
  delete db[table];
  return true;
}

async function query(table, q) {
  let collection = await list(table);
  let keys = Object.keys(q), key = keys[0];

  return collection.find(item => item[key] == q[key]) || null;
}

module.exports = {
  list,
  get,
  upsert,
  remove,
  query
}