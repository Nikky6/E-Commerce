const express = require('express');
const authenticate = require('../auth/middleware');
const paymentRouter = express.Router();
const paymentController = require('../controller/PaymentController');

paymentRouter.post('/check-out', authenticate, paymentController.payment)

module.exports = paymentRouter