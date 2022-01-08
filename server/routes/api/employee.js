const express = require('express');
const PostresClient = require('pg').Client;
const router = express.Router();
const EmployeeModal = require('../../models/employee_model');

const pgClient = new PostresClient({
  user: 'postgres',
  password: 'root',
  host: 'localhost',
  port: 5432,
  database: 'employee_db'
});

pgClient.connect().then(()=>{
  console.log('Connected to DB');
}).catch((err)=>{
  console.log('Error while connecting to DB: '+err);
});

const employeeModal = new EmployeeModal(pgClient);

// Get All Employees
router.get('/', async (req, res) => {
  try {
    var result = await employeeModal.findAll();
    console.table(result.rows);
    res.json(result.rows);
  } catch {
    res.sendStatus(500);
  }
});
// Get Employee By Id
router.get('/:id', async (req, res) => {
  try {
    var result = await employeeModal.findById(req.params.id);
    console.table(result.rows[0]);
    res.json(result.rows[0]);
  } catch {
    res.sendStatus(500);
  }
});

// Add Employee
router.post('/', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.insertOne({
    text: req.body.text,
    createdAt: new Date()
  });
  res.status(201).send();
});

// Delete Employee
router.delete('/:id', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
  res.status(200).send({});
});

module.exports = router;