const express = require('express');
const authenticate = require('../auth/middleware');
const cartRoutes = express.Router();
const cartController = require('../controller/CartController');

cartRoutes.get('/getCart/:userId', authenticate, cartController.getCart);
cartRoutes.post('/addItem', authenticate, cartController.addToCart);
cartRoutes.delete('/removeItem', authenticate, cartController.removeFromCart)


module.exports = cartRoutes