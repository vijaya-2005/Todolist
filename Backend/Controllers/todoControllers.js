const Todo = require('../Models/todoModel');

// Create a new Todo
exports.createTodo = async (req, res) => {
  const { title, description,deadline } = req.body;
  try {
    const newTodo = new Todo({
      title,
      description,
      deadline,
    });

    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ message: error.message});
  }
};

// Get all Todos
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching Todos' });
  }
};

// Update Todo by ID
exports.updateTodo = async (req, res) => {
  const { title, description,deadline, completed } = req.body;
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, description,deadline, completed },
      { new: true }
    );
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: 'Error updating Todo' });
  }
};

// Delete Todo by ID
exports.deleteTodo = async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting Todo' });
  }
};
