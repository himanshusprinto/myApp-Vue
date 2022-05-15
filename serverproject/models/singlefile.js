const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const singleFileSchema = new Schema({
    
   row : Object
});

module.exports = mongoose.model('SingleFile', singleFileSchema);