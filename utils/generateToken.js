const jwt = require("jsonwebtoken");

const generateToken = async (email,user) => {
  var token = await jwt.sign({ identifier:user._id }, "asingomasingoiskamaraarumarasirumar")

  return token;
}

module.exports = generateToken;

