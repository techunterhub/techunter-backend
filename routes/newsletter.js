const express = require('express');
const router = express.Router();
const newsletterController = require('../controllers/newsletter.controller');

router.post('/subscribe', newsletterController.addSubscriber);
router.post('/send', newsletterController.sendNewsletter);

module.exports = router;
