const { Schema, model } = require("mongoose");

const task = new Schema(
  {
    task: {
      type: Schema.Types.String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Task = model("Task", task);

module.exports = Task;
