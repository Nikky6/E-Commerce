const express = require('express');
const userRouter = express.Router();
const userRoutes = require('../controller/UserController')



userRouter.post('/register', userRoutes.register)
userRouter.post('/login', userRoutes.login)


module.exports = userRouter 