const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();


const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

const employee = require('./routes/api/employee');
const department = require('./routes/api/department');
const dept_desg = require('./routes/api/dept_desg');
const auth = require('./routes/auth');


app.use('/api/employee', employee);
app.use('/api/department', department);
app.use('/api/deptdesg', dept_desg);
app.use('/auth', auth.router);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

// module.exports = app;