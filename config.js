module.exports = {
  API: {
    PORT: process.env.API_PORT || 3000,
  },
  JWT: {
    secret: process.env.SECRECT || "secretPassword"
  }
}