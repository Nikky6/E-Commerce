const express = require('express');
const adminRouter = express.Router();
const adminController = require('./adminController');
const authenticate = require('../auth/middleware');


adminRouter.post('/addProduct', authenticate, adminController.addProduct);
adminRouter.put('/editProduct/:id', authenticate, adminController.editProduct);
adminRouter.post('/addToCart', authenticate, adminController.addToCart)

module.exports = adminRouter;
