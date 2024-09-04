const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Route to handle payment form submission
router.post('/payment', paymentController.initiatePayment);

module.exports = router;
