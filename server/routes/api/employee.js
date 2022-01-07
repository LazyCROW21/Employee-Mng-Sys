const express = require('express');

const router = express.Router();

// Get Employees
router.get('/', async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
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

async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(
    'mongodb://YOUR_OWN_MONGODB',
    {
      useNewUrlParser: true
    }
  );

  return client.db('vue_express').collection('posts');
}

module.exports = router;