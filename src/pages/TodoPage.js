import React, { useEffect, useState } from 'react';
import API from '../api';
import { getToken, removeToken } from '../utils/token';
import { useNavigate } from 'react-router-dom';
import '../styles/todo.css';

export default function TodoPage() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const navigate = useNavigate();

  const fetchTasks = useCallback(async () => {
  try {
    const res = await API.get('/tasks');
    setTasks(res.data);
  } catch (err) {
    console.error('Ошибка при загрузке задач:', err);
    if (err.response && err.response.status === 401) {
      removeToken();
      navigate('/login');
    }
  }
}, [navigate]);

  const addTask = async () => {
    if (!text) return;
    const res = await API.post('/tasks', { title: text });
    setTasks([res.data, ...tasks]);
    setText('');
  };

  const toggleTask = async (id, completed) => {
    const res = await API.patch(`/tasks/${id}`, { completed: !completed });
    setTasks(tasks.map(t => t.id === id ? res.data : t));
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    setTasks(tasks.filter(t => t.id !== id));
  };

  const logout = () => {
    removeToken();
    navigate('/login');
  };

  useEffect(() => {
  const token = getToken();
  if (!token) {
    navigate('/login');
    return;
  }

  fetchTasks();
}, [fetchTasks, navigate]);

  return (
    <div className="todo-container">
      <button className="logout-btn" onClick={logout}>Logout</button>
      <h2>My To-Do List</h2>
      <div className="todo-form">
        <input
          type="text"
          placeholder="New task..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul>
        {tasks.map(t => (
          <li key={t.id}>
            <div>
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => toggleTask(t.id, t.completed)}
              />
              {t.title}
            </div>
            <button onClick={() => deleteTask(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
