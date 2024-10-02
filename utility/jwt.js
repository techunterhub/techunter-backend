const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (id) => {
  const payload = { sub: id };

  const options = {
    expiresIn: "7d",
  };

  return jwt.sign(payload, process.env.JWT_SECRET_KEY || "", options);
};

module.exports = generateToken
