const express = require('express');
const productRouter = express.Router();
const ProductController = require('../controller/ProductController');
const authenticate = require('../auth/middleware');


productRouter.post('/addProduct', authenticate, ProductController.createProduct);
productRouter.get('/getAllProducts', ProductController.getProducts);
productRouter.get('/getProduct/:id', ProductController.getProductById);
productRouter.put('/updateProduct/:id', authenticate, ProductController.updateProduct);
productRouter.delete('/deleteProduct/:id', authenticate, ProductController.deleteProduct)

module.exports = productRouter