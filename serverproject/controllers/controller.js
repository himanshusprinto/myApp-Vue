const SingleFile = require('../models/singlefile');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require('../models/user')
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
            mongoose.connection.db.dropCollection("singlefiles")

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

const signUp = async (req, res) => {

        // Our register logic starts here
        try {
          // Get user input
          const { name, email, password } = req.body;

            // check if user already exist
          // Validate if user exist in our database
          const oldUser = await User.findOne({ email });
      
          if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
          }
      
          //Encrypt user password
          encryptedPassword = await bcrypt.hash(password, 10);
      
          // Create user in our database
          const user = await User.create({
            name,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
          });
      
          // Create token
          const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY||"secret",
            {
              expiresIn: "2h",
            }
          );
          // save user token
          user.token = token;
      
          // return new user
          res.status(201).json(user);
          console.log("done");
        } catch (err) {
          console.log(err);
        }
        // Our register logic ends here
        
      };

const signIn =  async (req, res) => {

        // Our login logic starts here
        try {
          // Get user input
          const { email, password } = req.body;
      
          // Validate user input
          if (!(email && password)) {
            res.status(400).send("All input is required");
          }
          // Validate if user exist in our database
          const user = await User.findOne({ email });
      
          if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
              { user_id: user._id, email },
              process.env.TOKEN_KEY||"secret",
              {
                expiresIn: "2h",
              }
            );
      
            // save user token
            user.token = token;
      
            // user
            res.status(200).json(user);
          }
          res.status(400).send("Invalid Credentials");
        } catch (err) {
          console.log(err);
        }
        // Our register logic ends here
      }      

 
module.exports = {singleFileUpload, displayData, deleteUser, signUp, signIn}