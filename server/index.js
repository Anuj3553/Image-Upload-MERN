const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/Users');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/Employee');

app.post('/uploadImage', async (req, res) => {
  try {
    // Find and delete the previous image, if any
    await UserModel.deleteMany(); // Delete all documents in the collection

    // Save new image
    const result = await UserModel.create({ image: req.body.image }); // Assuming the image data is sent in the request body
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/getImage', async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(3001, () => {
  console.log("Server is running");
});
