const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const Task = require('./models/Task');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Set storage engine for multer
const storage = multer.diskStorage({
    destination: './public/images/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Initialize upload
const upload = multer({ storage: storage }).single('image');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/todo', { useNewUrlParser: true, useUnifiedTopology: true });

// Routes
app.get('/', async (req, res) => {
    const tasks = await Task.find();
    res.render('index', { tasks: tasks });
});

app.post('/add', upload, async (req, res) => {
    const task = new Task({
        title: req.body.title,
        email: req.body.email,
        name: req.body.name,
        image: '/images/' + req.file.filename
    });
    await task.save();
    res.redirect('/');
});

app.post('/delete', async (req, res) => {
    await Task.findByIdAndDelete(req.body.taskId);
    res.redirect('/');
});

// Start Server
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});

