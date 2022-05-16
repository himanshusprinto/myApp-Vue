'use strict';
const SingleFile = require('../models/singlefile');
const xlsx = require('xlsx');
var fs = require('fs');

const singleFileUpload = async (req, res, next) => {
    try{
        //excel to json
        function convertExcelFileToJsonUsingXlsx() {
            // Read the file using pathname
            const file = xlsx.readFile(req.file.path);
            // Grab the sheet info from the file
            const sheetNames = file.SheetNames;
            const totalSheets = sheetNames.length;
            // Variable to store our data 
            let parsedData = [];
            // Loop through sheets
            for (let i = 0; i < totalSheets; i++) {
                // Convert to json using xlsx
                const tempData = xlsx.utils.sheet_to_json(file.Sheets[sheetNames[i]]);
                // Skip header row which is the colum names
                //tempData.shift();
                // Add the sheet's json to our data array
                parsedData.push(...tempData);
            }
         // call a function to save the data in a json file
            return parsedData;
        }
        for(var i=0;i<convertExcelFileToJsonUsingXlsx().length;i++){
            const file = new SingleFile({
                _id: convertExcelFileToJsonUsingXlsx()[i]._id,
                name: convertExcelFileToJsonUsingXlsx()[i].name,
                email: convertExcelFileToJsonUsingXlsx()[i].email,
                age: convertExcelFileToJsonUsingXlsx()[i].age
            });
            console.log(file);
            await file.save();
        }
        
        res.status(201).send('File Uploaded Successfully');
        //console.log(req.file);
    }catch(error) {
        res.status(400).send(error.message);
    }
}

const getallSingleFiles = async (req, res, next) => {
    try{
        const files = await SingleFile.find();
        res.status(200).send(files);
    }catch(error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    singleFileUpload,
    getallSingleFiles,
}