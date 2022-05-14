const express = require('express');
const multer = require('multer');

const app = express();

const fileFilter = function(req,file,cb){

    const allowedTypes = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];

    if(!allowedTypes.includes(file.mimetype)){
        const error = new Error("wrong file type");
        error.code = "Limit file types";
        return cb(error,false);
    }

    cb(null, true);
}
const MAX_SIZE=10000;
const upload = multer({
    dest: './uploads',
    fileFilter,
    limits: {
        fileSize:MAX_SIZE
    }
})

app.post('/upload',upload.single("file"), (req,res) =>{
    res.json({file:req.file});
});

app.use(function(err, req, res, next) {
    if(err.code === "Limit file types"){
        res.status(422).json({error:"only xlsx allowed"});
        return;
    }
    if(err.code === "Limit file size"){
        res.status(422).json({error:`Too large. Max size is ${MAX_SIZE/1000}Kb`});
        return;
    }

});

app.listen(3344, () => console.log("Running on localhost;3344"));