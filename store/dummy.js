const db = {
  user: [
    { id: 1, name: 'Carlos'},
  ],
};

function list(table) {
  return db[table];
}

function get (table, id) {
  let collection = list(table);
  return collection.find(item => item.id === id) || null
}

function upsert(table, data) {
  db[table].push(data);
}

function remove(table, id) {
  delete db[table];
  return true;
}

module.exports = {
  list,
  get,
  upsert,
  remove
}