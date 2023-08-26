const { Router } = require("express");
const {
  createTask,
  getAlltask,
  updateTask,
  deleteTask,
} = require("../Controller/taskController");

const router = Router();
router.get("/", getAlltask);
router.post("/", createTask);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);
module.exports = router;
