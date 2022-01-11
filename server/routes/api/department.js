const express = require('express');

const router = express.Router();
const DepartmentController = require('../../controllers/department_controller');

// Get All Departments
router.get('/', DepartmentController.getAllDepartments);

// Get Department By Id
router.get('/:id', DepartmentController.getDepartmentById);

// Add Department
router.post('/', DepartmentController.insertDepartment);

// Update Employee
router.patch('/:id', DepartmentController.updateDepartment);

// Delete Employee
router.delete('/:id', DepartmentController.deleteDepartment);

module.exports = router;