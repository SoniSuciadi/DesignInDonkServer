const jwt = require("jsonwebtoken");
const verifyJwt = (token) => {
  return jwt.verify(token, process.env.jwtKey);
};
module.exports = verifyJwt;
