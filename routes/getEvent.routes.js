const express = require("express");
const router = express.Router();

const {
    getEventsByQuery,
    getTodayEvent,
    getMonthlyEvent
} = require("../controllers/getEvent.controller");

router.route("/query").get(getEventsByQuery);
router.route("/today").get(getTodayEvent);
router.route("/month").get(getMonthlyEvent);

module.exports = router;
