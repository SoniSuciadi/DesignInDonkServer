const bcrypt = require("bcrypt");

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

module.exports = hashPassword;
