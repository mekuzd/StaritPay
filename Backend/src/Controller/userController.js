const User = require("../Model/user");
const createJWT = require("../utils/jwt");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    const emailAlreadyExists = await User.findOne({ email });
    if (emailAlreadyExists) {
      return res.status(403).json({ message: "user already registered" });
    }
    const user = await User.create({ name, email, password });
    const token = createJWT(user._id);
    res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: token,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "please contact admin" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "invalid credentials" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(404).json({ message: "invalid credentials" });
    }
    const token = createJWT(user._id);
    res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: token,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "please contact admin" });
  }
};
module.exports = {
  registerUser,
  loginUser,
};
