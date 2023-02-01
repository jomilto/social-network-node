const mysql = require("mysql");

const config = require("../config");
const error = require("../utils/error");

const dbConfig = {
  host: config.MYSQL.host,
  port: config.MYSQL.port,
  user: config.MYSQL.user,
  password: config.MYSQL.password,
  database: config.MYSQL.db,
  timeout: 60000
}

let connection;

async function handleConnect() {
 
    connection = mysql.createConnection(dbConfig);
    connection.connect((err) => {
      if (err) {
        console.log("[db error]: ", err);
        setTimeout(handleConnect, 2000);
      } 
      else {
        console.log("DB connected")
      }
    });

    connection.on('error', err => {
      console.log("[db error]: ",err);
      if(err.code === "PROTOCOL_CONNECTION_LOST") {
        handleConnect();
      }
      else {
        throw err;
      }
    });
}

handleConnect();

function list(table) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ??;`, [table], function (error, results) {
      if (error) return reject(error);
      return resolve(results);
    });
  });
}

function get(table, id) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ?? WHERE id = ?;`, [table, id], function (error, results) {
      if (error) return reject(error);
      return resolve(results);
    });
  });
}

function insert(table, data) {
  return new Promise((resolve, reject) => {
      connection.query(`INSERT INTO ${table} SET ?;`, data, (err, result) => {
          if (err) return reject(err);
          resolve(data.id || true);
      })
  })
}

function update(table, data) {
  return new Promise((resolve, reject) => {
      connection.query(`UPDATE ?? SET ? WHERE id=? LIMIT 1;`, [table, data, data.id], (err, result) => {
          if (err) return reject(err);
          resolve(data.id || true);
      })
  })
}

function upsert(table, data, createRecord) {
  if (data && !createRecord) {
      return update(table, data);
  } else {
      return insert(table, data);
  }
}

function query(table, query, join) {
  let joinQuery = '';

  if (join) {
    const key = Object.keys(join)[0];
    const val  = join[key];
    joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`
  }

  return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM ?? ${joinQuery} WHERE ??.?;`, [table, table, query], (err, res) => {
          if (err) return reject(err);
          resolve(res[0] || null);
      })
  })
}

function remove(table, id) {
  return new Promise((resolve, reject) => {
    connection.query(`DELETE FROM ?? WHERE id = ? LIMIT 1;`, [table, id], function (error, results) {
      if (error) return reject(error);
      return resolve(true);
    });
  });
}

module.exports = {
  list,
  get,
  upsert,
  remove,
  query
}