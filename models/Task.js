const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: String,
    email: String,
    name: String,
    image: String,
    completed: { type: Boolean, default: false },
});

module.exports = mongoose.model('Task', taskSchema);

