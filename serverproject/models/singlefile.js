const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const singleFileSchema = new Schema({
   _id:{
      type:Number,
      required:true
   },
   name:{
      type:String,
      required:true
   },
   email:{
      type:String,
      required:true
   },
   age:{
      type:Number,
      required:true
   },
});

const userDB = mongoose.model('SingleFile', singleFileSchema);

module.exports = userDB;