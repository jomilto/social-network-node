module.exports = {
  API: {
    PORT: process.env.API_PORT || 3000,
  },
  JWT: {
    secret: process.env.SECRECT || "secretPassword"
  },
  MYSQL: {
    host: process.env.MYSQL_HOST || "localhost",
    port: process.env.MYSQL_PORT || "6033",
    user: process.env.MYSQL_USER || "db_user",
    password: process.env.MYSQL_PASSWORD || "db_user_pass",
    db: process.env.MYSQL_DB || "testing",
  }
}