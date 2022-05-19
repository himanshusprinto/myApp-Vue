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

const deleteUser = (req, res)=>{
  const id = req.params.id;

  SingleFile.findByIdAndDelete(id)
      .then(data => {
          if(!data){
              res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
          }else{
              res.send({
                  message : "User was deleted successfully!"
              })
          }
      })
      .catch(err =>{
          res.status(500).send({
              message: "Could not delete User with id=" + id
          });
      });
}
 
module.exports = {singleFileUpload, displayData, deleteUser}