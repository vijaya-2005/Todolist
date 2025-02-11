const express = require('express');
const { createTodo, getTodos, updateTodo, deleteTodo } = require('../Controllers/todoControllers');
const router = express.Router();

router.post('/todos', createTodo).get('/todos', getTodos);
router.put('/todos/:id', updateTodo).delete('/todos/:id', deleteTodo);

module.exports = router;
