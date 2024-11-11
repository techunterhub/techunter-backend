
const express= require('express');
const {CreateEvent,
    EditEvent,
    DeleteEvent,ShowEvents,GetEvent}= require('../controllers/eventDetails.controlller')
const router= express.Router();


router.route('/event').post(CreateEvent);
router.route('/event/update/:id').put(EditEvent);
router.route('/event/delete/:id').delete(DeleteEvent);
router.route('/event/show').get(ShowEvents);
router.route('/event/getById/:id').get(GetEvent);



module.exports= router;