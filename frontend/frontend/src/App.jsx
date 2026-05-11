import { useState, useEffect } from 'react';
import './App.css';

import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

import {
  getTasks,
  createTask,
  toggle,
  UpdateTask,
  deleteTask,
} from './api';

function App() {
  const [tasks, setTasks] = useState([]);

  // FETCH TASKS
  useEffect(() => {
    async function fetchTasks() {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    }

    fetchTasks();
  }, []);

  // ADD TASK
  async function addTask(title) {
    try {
      const newTask = await createTask(title);
      setTasks([...tasks, newTask]);
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  }

  // TOGGLE TASK
  async function handleCompletedTask(id) {
    try {
      await toggle(id);

      setTasks(
        tasks.map((task) =>
          task.id === id
            ? { ...task, completed: !task.completed }
            : task
        )
      );
    } catch (error) {
      console.error('Failed to toggle task:', error);
    }
  }

  // DELETE TASK
  async function handleDeleteTask(id) {
    try {
      await deleteTask(id);

      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  }

  // EDIT TASK
  async function handleEditTask(id, newTitle) {
    try {
      const updated = await UpdateTask(id, newTitle);

      setTasks(
        tasks.map((task) =>
          task.id === id
            ? { ...task, title: updated.title }
            : task
        )
      );
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  }

  return (
    <div>
      <TaskForm onAdd={addTask} />

      <TaskList
        tasks={tasks}
        onToggle={handleCompletedTask}
        onDelete={handleDeleteTask}
        onEdit={handleEditTask}
      />
    </div>
  );
}

export default App;