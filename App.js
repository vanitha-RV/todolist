import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, editTodo, deleteTodo } from './features/todos/todoslice.js';
import "./App.css"
const TodoApp = () => {
  const [task, setTask] = useState('');
  const [editing, setEditing] = useState(null);
  const todos = useSelector(state => state.todos.todos);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (task.trim()) {
      dispatch(addTodo({
        id: Date.now(),
        text: task,
      }));
      setTask('');
    }
  };

  const handleEditTodo = () => {
    if (task.trim()) {
      dispatch(editTodo({
        id: editing,
        newText: task,
      }));
      setTask('');
      setEditing(null);
    }
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleEditClick = (todo) => {
    setTask(todo.text);
    setEditing(todo.id);
  };

  return (
    <div className="fruit-app">
      
      <h1>Welcome to JA fruit stall</h1><br/>
      <h2>Type your order here</h2>

      <input 
        type="text" 
        value={task} 
        onChange={(e) => setTask(e.target.value)} 
        placeholder="Add an item"
      />
      
      <button onClick={editing ? handleEditTodo : handleAddTodo}>
        {editing ? 'Update item ' : 'Add item'}
      </button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => handleEditClick(todo)}>Edit</button>
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;