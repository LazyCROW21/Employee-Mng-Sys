const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();


const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

const employee = require('./routes/api/employee');
const auth = require('./routes/auth');


app.use('/api/employee', employee);
app.use('/auth', auth.router);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));