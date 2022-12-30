const jwt = require('jsonwebtoken');

function sign(data) {
  return jwt.sign(data, 'secretPassword')
}

module.exports = {
  sign,
};