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
router.delete('/:id', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
  res.status(200).send({});
});

module.exports = router;