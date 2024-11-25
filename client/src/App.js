import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Fetch todos
  useEffect(() => {
    axios.get('http://localhost:5000/api/todos')
      .then((response) => setTodos(response.data))
      .catch((error) => console.error(error));
  }, []);

  // Add a new todo
  const addTodo = () => {
    axios.post('http://localhost:5000/api/todos', { task: newTask })
      .then((response) => setTodos([...todos, response.data]))
      .catch((error) => console.error(error));
    setNewTask('');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Simple MERN App</h1>
      <input
        type="text"
        placeholder="New Task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTodo}>Add Task</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.task} {todo.completed ? '✅' : '❌'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
