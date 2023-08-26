const Task = require("../Model/task");

const createTask = async (req, res) => {
  try {
    const task = await Task.create({ task: req.body.task });
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ message: "please contact your admin" });
  }
};
module.exports = {
  createTask,
};
