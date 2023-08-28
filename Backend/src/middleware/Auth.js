const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../Config/config");
const User = require("../Model/user");

async function auth(req, res, next) {
  try {
    const token = String(req.headers.authorization).split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "unauthorised" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findOne({ _id: decoded.id });

    if (!user) {
      return res.status(401).json({ message: "unauthorised" });
    }
    req["user"] = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "unauthorised" });
  }
}
module.exports = auth;
