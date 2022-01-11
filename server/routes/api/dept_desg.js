const express = require('express');

const router = express.Router();
const DeptDesgController = require('../../controllers/dept_desg_controller');

// Get All Department Designations
router.get('/', DeptDesgController.getAllDeptDesgs);

// Get Department Designation By Id
router.get('/:id', DeptDesgController.getDeptDesgById);

// Add Department Designation
router.post('/', DeptDesgController.insertDeptDesg);

// Update Department Designation
router.patch('/:id', DeptDesgController.updateDeptDesg);

// Delete Department Designation
router.delete('/:id', DeptDesgController.deleteDeptDesg);

module.exports = router;