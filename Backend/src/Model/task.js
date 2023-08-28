const { Schema, model } = require("mongoose");

const task = new Schema(
  {
    task: {
      type: Schema.Types.String,
      required: true,
    },
    host: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

const Task = model("Task", task);

module.exports = Task;
