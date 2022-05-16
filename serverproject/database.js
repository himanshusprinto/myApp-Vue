'use strict';
const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb+srv://mongo_db:3314himanshu@cluster0.xc5bv.mongodb.net/vueDB?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true,
    }).then(() => console.log('Connected to Mongodb...'));
}