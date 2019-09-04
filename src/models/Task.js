const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    user: String,
    status: String
});

module.exports = mongoose.model('taskCollection', taskSchema);