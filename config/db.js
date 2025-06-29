const mongoose = require('mongoose');
const mongoUrl = 'mongodb://localhost:27017/e-commerce';

const connection = mongoose.connect(mongoUrl)
    .then(() => {
        console.log('connected to Database')
    })
    .catch((e) => {
        console.log('error in connectiong the Database', e)
    });

module.exports = connection