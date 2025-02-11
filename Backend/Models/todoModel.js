const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  deadline:{type: String},
  completed: { type: Boolean, default: false },
});

module.exports = mongoose.model('Todo', TodoSchema);
