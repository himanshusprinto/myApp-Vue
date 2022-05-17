'use strict';
const express = require('express');
const mongoose = require('mongoose')
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileRoutes = require('./routes/file-upload-routes');

const port = process.env.PORT || 8000;
const app = express();
app.use(cors());

require('./database')();

app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/', fileRoutes.routes);


app.listen(port, () => console.log(`server is listening on url http://localhost:${port}`));