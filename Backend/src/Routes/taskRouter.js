const { Router } = require("express");
const {
  createTask,
  getAlltask,
  updateTask,
  deleteTask,
  getUserTask,
} = require("../Controller/taskController");

const router = Router();
router.get("/", getUserTask);
router.post("/", createTask);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);
module.exports = router;
