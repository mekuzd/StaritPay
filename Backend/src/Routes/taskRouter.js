const { Router } = require("express");
const { createTask } = require("../Controller/taskController");

const router = Router();
router.post("/", createTask);
module.exports = router;
