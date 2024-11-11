const express = require("express");
const router = express.Router();


const { RegisterEvent } = require("../controllers/event.controller"); 

router.route("/registerEvent").post(RegisterEvent);

module.exports = router;

const { 

    deleteEvent,
    getEvent,
    updateEvent
} = require("../controllers/event.controller"); 

router.route("/registerEvent").post(RegisterEvent);
router.route("/deleteEvent/:id").delete(deleteEvent);
router.route("/getEvent").get(getEvent);
router.route("/updateEvent/:id").patch(updateEvent);

module.exports = router;

