const SingleFile = require('../models/singlefile');
const mongoose = require('mongoose')
const xlsx = require('xlsx');

const singleFileUpload = async (req, res, next) => {
    try{
            function convertExcelFileToJsonUsingXlsx() {
              const file = xlsx.readFile(req.file.path);
              let parsedData = [];
              const tempData = xlsx.utils.sheet_to_json(file.Sheets[file.SheetNames[0]]);
              parsedData.push(...tempData);
              return parsedData;
            }
            for(var i=0;i<convertExcelFileToJsonUsingXlsx().length;i++){
                const file = new SingleFile({
                  _id: convertExcelFileToJsonUsingXlsx()[i]._id,
                  name: convertExcelFileToJsonUsingXlsx()[i].name,
                  email: convertExcelFileToJsonUsingXlsx()[i].email,
                  age: convertExcelFileToJsonUsingXlsx()[i].age
                });
            await file.save();
          }
          res.status(201).send('File Uploaded Successfully');
          //console.log(req.file);
        }catch(error) {
          res.status(400).send(error.message);
      }
  }

const displayData = async (req,res)=> {
     var singleFileSchema = mongoose.model('SingleFile',singleFileSchema);
         var userData = await singleFileSchema.find({});
         res.send(userData)
        
}  

module.exports = {singleFileUpload, displayData}