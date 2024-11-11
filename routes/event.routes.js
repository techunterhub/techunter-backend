const express = require("express");
const router = express.Router();


const registerEvent = require("../controllers/event.controller");

router.route("/register").post(registerEvent);




module.exports = router;

