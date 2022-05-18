const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const singleFileSchema = new Schema({
   _id:Number,
   name:String,
   email:String,
   age:Number
});

const userDB = mongoose.model('SingleFile', singleFileSchema);

module.exports = userDB;