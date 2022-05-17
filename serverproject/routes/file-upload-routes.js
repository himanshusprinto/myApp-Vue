'use strict';
const mongoose = require('mongoose')
const express = require('express');
const {upload} = require('../helpers/filehelper');
const {singleFileUpload} = require('../controllers/fileuploaderController');

const router = express.Router();

router.post('/singleFile', upload.single('file'), singleFileUpload);
router.get('/displayData',(req,res)=>{
    var singleFileSchema = mongoose.model('SingleFile',singleFileSchema);
        var userData = singleFileSchema.find({});
        userData.exec((err,data)=>{
          if(err){
            console.log(err);
          }else{
            //console.log(data);
            res.send(data);
          }
        })
        
  })

module.exports = { routes: router }