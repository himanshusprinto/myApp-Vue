const express = require('express');
const {upload} = require('../helpers/helper');
const {singleFileUpload, displayData, deleteUser,signUp, signIn} = require('../controllers/controller');

const router = express.Router();

/**
 *  @description Root Route
 *  @method POST /singleFile
 */
router.post('/singleFile', upload.single('file'), singleFileUpload);
/**
 *  @description DisplayData Route
 *  @method GET /displayData
 */
router.get('/displayData', displayData)

// API

// Delete User with given ID
router.post('/deleteUser/:id', deleteUser);

/**
 *  @description Register
 *  @method POST /signup
 */
router.post('/signup',signUp);

/**
 *  @description Register
 *  @method POST /signup
 */
 router.post('/login',signIn);

module.exports = router