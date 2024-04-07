const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const UserModel = require('./models/Users');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

mongoose.connect('mongodb://127.0.0.1:27017/Employee');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage
});

app.post('/uploadImage', upload.single('file'), async (req, res) => {
  try {
    // Find and delete the previous image, if any
    const users = await UserModel.find();
    if (users.length > 0) {
      const previousImage = users[0].image;
      const imagePath = path.join(__dirname, 'public/images', previousImage);
      fs.unlinkSync(imagePath);
      await UserModel.deleteMany(); // Delete all documents in the collection
    }

    // Save new image
    const result = await UserModel.create({ image: req.file.filename });
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
