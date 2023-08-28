const { Router } = require("express");
const {
  createTask,
  updateTask,
  deleteTask,
  getUserTask,
} = require("../Controller/taskController");
const auth = require("../middleware/Auth");

const router = Router();
router.get("/", getUserTask);
router.post("/", createTask);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);
module.exports = router;
