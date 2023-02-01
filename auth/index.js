const jwt = require('jsonwebtoken');
const config = require("../config");
const error = require('../utils/error');

const { secret } = config.JWT;

function sign(data) {
  return jwt.sign(data, secret)
}

function verify(token) {
  return jwt.verify(token, secret)
}

const check = {
  own: function (req, owner) {
    const decodedToken = decodeHeader(req);
    if(decodedToken.id !== owner) throw error("Missing permitions", 401);
  },
  logged: function (req) {
    const decodedToken = decodeHeader(req);
  }
}

function getToken (auth) {
  if(!auth) throw error('Missing token', 401);
  if(!auth.includes("Bearer ")) throw error("Token not identified", 401);
  let token = auth.replace("Bearer ", "");

  return token;
}

function decodeHeader(req) {
  const { authorization } = req.headers;
  const token = getToken(authorization);
  const decoded = verify(token);

  req.user = decoded;
  return decoded;
}

module.exports = {
  sign,
  check,
};