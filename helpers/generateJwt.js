const jwt = require("jsonwebtoken");

let generateJWT = (user) => {
  console.log(user);
  return jwt.sign(
    {
      id: user._id,
      username: user.fullName,
      imgUrl: user.imgUrl,
    },
    process.env.jwtKey
  );
};
module.exports = generateJWT;
