// src/components/TodoList.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import '../styles/TodoList.css';

function TodoList({ user }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'tasks'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasksList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTasks(tasksList);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching tasks:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user.uid]);

  const toggleComplete = async (taskId, currentStatus) => {
    try {
      await updateDoc(doc(db, 'tasks', taskId), {
        completed: !currentStatus
      });
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await deleteDoc(doc(db, 'tasks', taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  if (loading) {
    return <div className="loading-tasks">Loading tasks...</div>;
  }

  if (tasks.length === 0) {
    return <div className="empty-list">No tasks yet. Add some tasks to get started!</div>;
  }

  return (
    <div className="todo-list">
      <h2>Your Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <div className="task-content">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id, task.completed)}
                id={`task-${task.id}`}
              />
              <label htmlFor={`task-${task.id}`}>
                {task.task}
              </label>
            </div>
            <div className="task-actions">
              <button 
                onClick={() => deleteTask(task.id)}
                className="delete-btn"
                aria-label="Delete task"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;