const { Router } = require("express");
const { registerUser, loginUser } = require("../Controller/userController");

const router = Router();

router.post("/", registerUser);
router.post("/signin", loginUser);

module.exports = router;
