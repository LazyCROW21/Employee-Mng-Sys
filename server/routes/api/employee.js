const express = require('express');

const router = express.Router();
const EmployeeController = require('../../controllers/employee_controller');

// Get All Employees
router.get('/', EmployeeController.getAllEmployees);

// Get Employee By Id
router.get('/:id', EmployeeController.getEmployeeById);

// Add Employee
router.post('/', EmployeeController.insertEmployee);

// Delete Employee
router.delete('/:id', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
  res.status(200).send({});
});

module.exports = router;