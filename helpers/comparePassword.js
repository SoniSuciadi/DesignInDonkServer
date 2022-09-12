const bcrypt = require("bcrypt");
let comparePassword = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword);
};
module.exports = comparePassword;
