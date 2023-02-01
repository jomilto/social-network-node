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
    connection.query(`SELECT * FROM ${table};`, function (error, results) {
      if (error) return reject(error);
      return resolve(results);
    });
  });
}

module.exports = {
  list,
}