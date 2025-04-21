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
  deleteDoc,
  serverTimestamp
} from 'firebase/firestore';
import '../styles/TodoList.css';

function TodoList({ user, setEditingTask }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (!user?.uid) return;

    const q = query(
      collection(db, 'tasks'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const tasksList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setTasks(tasksList);
        setLoading(false);
      }, 
      (error) => {
        console.error('Error fetching tasks:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user?.uid]);

  const toggleComplete = async (taskId, currentStatus) => {
    try {
      await updateDoc(doc(db, 'tasks', taskId), {
        completed: !currentStatus,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteDoc(doc(db, 'tasks', taskId));
      setEditingTask(null);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;
  const activeCount = totalCount - completedCount;

  if (loading) {
    return (
      <div className="todo-list fade-in">
        <h2 className="section-title">Your Tasks</h2>
        <div className="loading-tasks">Loading tasks...</div>
      </div>
    );
  }

  return (
    <div className="todo-list fade-in">
      <h2 className="section-title">Your Tasks</h2>
      
      {totalCount > 0 && (
        <>
          <div className="task-summary">
            <span>{totalCount} total task{totalCount !== 1 ? 's' : ''}</span>
            <span>{activeCount} active • {completedCount} completed</span>
          </div>
          
          <div className="filter-options">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
              onClick={() => setFilter('active')}
            >
              Active
            </button>
            <button 
              className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
              onClick={() => setFilter('completed')}
            >
              Completed
            </button>
          </div>
        </>
      )}
      
      {filteredTasks.length === 0 ? (
        <div className="empty-list">
          {filter === 'all' 
            ? "No tasks yet. Add some tasks to get started!" 
            : filter === 'active' 
              ? "No active tasks. Great job!" 
              : "No completed tasks yet."}
        </div>
      ) : (
        <ul>
          {filteredTasks.map((task) => (
            <li key={task.id} className={`fade-in ${task.completed ? 'completed' : ''}`}>
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
                  onClick={() => handleEdit(task)}
                  className="edit-btn"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(task.id)}
                  className="delete-btn"
                  aria-label="Delete task"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;