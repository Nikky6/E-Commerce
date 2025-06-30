const express = require('express');
const app = express()
const port = 3000
const cors = require('cors');
require('dotenv').config()
const mongoose = require('./config/db');

const userRouter = require('./routes/UserRoutes');
const productRouter = require('./routes/ProductRoutes');
const cartRouter = require('./routes/CartRoutes');
const orderRouter = require('./routes/OrderRoutes');
const adminRouter = require('./admin/adminRoutes')



app.use(cors());
app.use(express.json());


app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter)
app.use('/api/admin', adminRouter)


app.listen(port, () => {
    console.log(`server is running on port${port}`)
})