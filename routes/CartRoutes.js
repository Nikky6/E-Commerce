const express = require('express');
const authenticate = require('../auth/middleware');
const cartRoutes = express.Router();
const cartController = require('../controller/CartController');

cartRoutes.get('/getCart', authenticate, cartController.getCart);
cartRoutes.post('/addItem', authenticate, cartController.addToCart);
cartRoutes.post('/removeItem', authenticate, cartController.removeFromCart)


module.exports = cartRoutes