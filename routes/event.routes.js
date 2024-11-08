const express = require("express");
const router = express.Router();

const { RegisterEvent } = require("../controllers/event.controller"); 

router.route("/registerEvent").post(RegisterEvent);

module.exports = router;