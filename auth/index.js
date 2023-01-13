const jwt = require('jsonwebtoken');
const config = require("../config");
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
    if(decodedToken.id !== owner) throw new Error("Missing permitions")
  }
}

function getToken (auth) {
  if(!auth) throw new Error('Missing token');
  if(!auth.includes("Bearer ")) throw new Error("Token not identified");
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