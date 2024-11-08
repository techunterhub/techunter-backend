const express = require("express");
const router = express.Router();

const { RegisterUser } = require("../controllers/registerUser.controller");

router.route("/registerEvent").post(RegisterUser);

module.exports = router;
