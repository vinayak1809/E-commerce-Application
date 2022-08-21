const express = require("express");
const router = express.Router();

const UserController = require("../controller/save");

router.get("/login", UserController.getUser);
router.post("/login", UserController.postUser);

router.post("/delete/:userId", UserController.deleteUser);

module.exports = router;
