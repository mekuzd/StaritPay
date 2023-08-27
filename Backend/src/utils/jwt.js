const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../Config/config");

const createJWT = (id) => {
  const payload = {
    id: id,
  };
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: "30d",
  });
  return token;
};

module.exports = createJWT;
