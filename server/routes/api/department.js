const express = require('express');

const router = express.Router();
const DepartmentController = require('../../controllers/department_controller');

// Get All Departments
router.get('/', DepartmentController.getAllDepartments);

// Get Department By Id
router.get('/:id', DepartmentController.getDepartmentById);

// Add Department
router.post('/', DepartmentController.insertDepartment);

// Delete Employee
router.delete('/:id', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
  res.status(200).send({});
});

module.exports = router;