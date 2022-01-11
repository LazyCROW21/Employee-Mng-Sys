const express = require('express');

const router = express.Router();
const EmployeeController = require('../../controllers/employee_controller');

// Get All Employees
router.get('/', EmployeeController.getAllEmployees);

// Get Employee By Id
router.get('/:id', EmployeeController.getEmployeeById);

// Add Employee
router.post('/', EmployeeController.insertEmployee);

// Update Employee
router.patch('/:id', EmployeeController.updateEmployee);

// Delete Employee
router.delete('/:id', EmployeeController.deleteEmployee);

module.exports = router;