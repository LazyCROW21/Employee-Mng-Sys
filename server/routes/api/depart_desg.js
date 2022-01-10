const express = require('express');

const router = express.Router();
const DeptDesgController = require('../../controllers/dept_desg_controller');

// Get All Departments
router.get('/', DeptDesgController.getAllDeptDesgs);

// Get Department By Id
router.get('/:id', DeptDesgController.getDeptDesgById);

// Add Department
router.post('/', DeptDesgController.insertDeptDesg);

// Delete Employee
router.delete('/:id', DeptDesgController.deleteDeptDesg);

module.exports = router;