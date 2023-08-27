const bcrypt = require("bcryptjs");

const { Schema, model } = require("mongoose");

const user = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },
    password: {
      type: Schema.Types.String,
      required: true,
    },
    email: {
      type: Schema.Types.String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

user.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
const User = model("User", user);

module.exports = User;
