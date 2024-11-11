
const express = require('express');
const router = express.Router();
const validateRequestWithSchema = require("../utility/customError");
const { 
    CreateEvent,
    UpdateEvent,
    DeleteEvent, 
    getAllEvents, 
    getSingleEvent } = require('../controllers/eventDetails.controller');
const EventManagement = require('../models/event-detail.models');


router.route('/event').post(validateRequestWithSchema(EventManagement.schema),CreateEvent);
router.route('/event/update/:id').put(validateRequestWithSchema(EventManagement.schema),UpdateEvent);
router.route('/event/delete/:id').delete(validateRequestWithSchema(EventManagement.schema),DeleteEvent);
router.route('/event/show').get(validateRequestWithSchema(EventManagement.schema),getAllEvents);
router.route('/event/getById/:id').get(validateRequestWithSchema(EventManagement.schema),getSingleEvent);

module.exports = router;