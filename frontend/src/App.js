import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: '', description: '', deadline: '' });
  const [isEditing, setIsEditing] = useState(null); // Track the todo being edited
  const [updatedTodo, setUpdatedTodo] = useState({
    title: '',
    description: '',
    deadline: '',
  });

  // Fetch all todos from the backend Home
  const fetchTodos = async () => {
    try {
      const result = await axios.get('http://localhost:5000/Home/todos');
      setTodos(result.data);
    } catch (err) {
      console.error('Error fetching todos', err);
    }
  };

  // Add a new todo
  const handleAddTodo = async () => {
    try {
      if (newTodo.title && newTodo.deadline) {
        await axios.post('http://localhost:5000/Home/todos', newTodo);
        setNewTodo({ title: '', description: '', deadline: '' });
        fetchTodos(); // Refresh the list
      }
    } catch (err) {
      console.error('Error adding todo', err);
    }
  };

  // Handle changes to input fields (new todo)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTodo({ ...newTodo, [name]: value });
  };

  // Handle editing a todo (show edit fields)
  const handleEditTodo = (todo) => {
    setIsEditing(todo._id);
    setUpdatedTodo({
      title: todo.title,
      description: todo.description,
      deadline: todo.deadline,
    });
  };

  // Save the updated todo
  const handleSaveUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:5000/Home/todos/${id}`, updatedTodo);
      setIsEditing(null); // Exit edit mode
      fetchTodos(); // Refresh the list
    } catch (err) {
      console.error('Error updating todo', err);
    }
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setIsEditing(null);
    setUpdatedTodo({ title: '', description: '', deadline: '' });
  };

  // Handle delete
  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/Home/todos/${id}`);
      fetchTodos(); // Refresh the list
    } catch (err) {
      console.error('Error deleting todo', err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="App">
      <h1>Todo List</h1>

      {/* Add Todo Form */}
      <div className="new-todo">
        <input
          type="text"
          name="title"
          value={newTodo.title}
          onChange={handleChange}
          placeholder="Enter title"
        />
        <textarea
          name="description"
          value={newTodo.description}
          onChange={handleChange}
          placeholder="Enter description"
        ></textarea>
        <input
          type="date"
          name="deadline"
          value={newTodo.deadline}
          onChange={handleChange}
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>

      {/* Todo List */}
      <div className="todo-container">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <div key={todo._id} className="todo-item">
              {/* Edit mode */}
              {isEditing === todo._id ? (
                <div className="todo-details">
                  <input
                    type="text"
                    value={updatedTodo.title}
                    onChange={(e) =>
                      setUpdatedTodo({ ...updatedTodo, title: e.target.value })
                    }
                  />
                  <textarea
                    value={updatedTodo.description}
                    onChange={(e) =>
                      setUpdatedTodo({ ...updatedTodo, description: e.target.value })
                    }
                  ></textarea>
                  <input
                    type="date"
                    value={updatedTodo.deadline}
                    onChange={(e) =>
                      setUpdatedTodo({ ...updatedTodo, deadline: e.target.value })
                    }
                  />
                  <button onClick={() => handleSaveUpdate(todo._id)}>Save</button>
                  <button onClick={handleCancelEdit}>Cancel</button>
                </div>
              ) : (
                <div className="todo-details">
                  <h3>{todo.title}</h3>
                  <p>{todo.description}</p>
                  <p><strong>Deadline: </strong>{todo.deadline}</p>
                </div>
              )}

              {/* Action Buttons */}
              <button onClick={() => handleEditTodo(todo)}>Edit</button>
              <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No todos available</p>
        )}
      </div>
    </div>
  );
};

export default App;
