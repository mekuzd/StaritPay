require("dotenv").config();
const { MONGO_URI, PORT, JWT_SECRET } = process.env;
module.exports = {
  MONGO_URI,
  PORT,
  JWT_SECRET,
};
