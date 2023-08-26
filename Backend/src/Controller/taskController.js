const Task = require("../Model/task");

const createTask = async (req, res) => {
  try {
    const task = await Task.create({ task: req.body.task });
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ message: "please contact your admin" });
  }
};

const updateTask = async (req, res) => {
  try {
    const taskExist = await Task.findOne({ _id: req.params.id });
    if (!taskExist) {
      return res
        .status(404)
        .json({ message: `No task with id : ${req.params.id}` });
    }
    const task = await Task.findOneAndUpdate({ _id: taskExist._id }, req.body, {
      new: true,
    });
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ message: "please contact your admin" });
  }
};
const deleteTask = async (req, res) => {
  try {
    const taskExist = await Task.findOne({ _id: req.params.id });
    if (!taskExist) {
      return res
        .status(404)
        .json({ message: `No task with id : ${req.params.id}` });
    }
    const task = await Task.findOneAndRemove({ _id: taskExist._id });
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ message: "please contact your admin" });
  }
};

const getAlltask = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ message: "please contact your admin" });
  }
};
module.exports = {
  createTask,
  updateTask,
  deleteTask,
  getAlltask,
};
