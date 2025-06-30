const express = require('express');
const authenticate = require('../auth/middleware');
const orderRouter = express.Router();
const OrderController = require('../controller/OrderController')

orderRouter.post('/createOrder', authenticate, OrderController.createOrder);
orderRouter.get('/getOrders/:userId', authenticate, OrderController.getOrdersByUser)
orderRouter.get('/getOrders/:id', authenticate, OrderController.getOrder)


module.exports = orderRouter