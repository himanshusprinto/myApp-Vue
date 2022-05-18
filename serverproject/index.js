const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileRoutes = require('./routes/routes')
const connectDb = require('./database');

const port = process.env.PORT || 8000;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Database Connection
connectDb();

// Routes
app.use('/', fileRoutes);


app.listen(port, () => console.log(`server is listening on url http://localhost:${port}`));