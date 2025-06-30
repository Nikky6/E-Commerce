const express = require('express');
const adminRouter = express.Router();
const adminController = require('./adminController');

// Admin routes
adminRouter.post('/addProduct',  adminController.addProduct);
adminRouter.put('/editProduct/:id',  adminController.editProduct);

module.exports = adminRouter;
