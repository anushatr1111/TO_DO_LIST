import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
import '../styles/TodoForm.css';

function TodoForm({ user, editingTask, setEditingTask }) {
  const [task, setTask] = useState(editingTask?.task || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!task.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      if (editingTask) {
        // UPDATE: Existing task
        await updateDoc(doc(db, 'tasks', editingTask.id), {
          task: task,
          updatedAt: serverTimestamp()
        });
        setEditingTask(null);
      } else {
        // CREATE: New task
        await addDoc(collection(db, 'tasks'), {
          task: task,
          completed: false,
          userId: user.uid,
          createdAt: serverTimestamp()
        });
      }
      
      setTask('');
    } catch (error) {
      console.error('Error saving task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="todo-form fade-in">
      <h2 className="section-title">{editingTask ? 'Edit Task' : 'Add New Task'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="What needs to be done?"
          disabled={isSubmitting}
          autoFocus
        />
        <button 
          type="submit" 
          disabled={isSubmitting || !task.trim()}
        >
          {isSubmitting 
            ? (editingTask ? 'Updating...' : 'Adding...') 
            : (editingTask ? 'Update Task' : 'Add Task')}
        </button>
        {editingTask && (
          <button 
            type="button" 
            onClick={() => {
              setEditingTask(null);
              setTask('');
            }}
            disabled={isSubmitting}
            className="cancel-btn"
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}

export default TodoForm;