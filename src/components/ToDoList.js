import { useEffect, useState } from "react";
import { todosCollection } from "../firebase";
import { onSnapshot, updateDoc, deleteDoc, doc } from "firebase/firestore";
import "../styles/ToDoList.css";

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(todosCollection, (snapshot) => {
      setTodos(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  const toggleComplete = async (id, completed) => {
    const todoDoc = doc(todosCollection, id);
    await updateDoc(todoDoc, { completed: !completed });
  };

  const deleteTodo = async (id) => {
    await deleteDoc(doc(todosCollection, id));
  };

  return (
    <div className="todo-container">
      <h2>📝 To-Do List</h2>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <span
              onClick={() => toggleComplete(todo.id, todo.completed)}
              className={`todo-text ${todo.completed ? "completed" : ""}`}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)} className="delete-btn">
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
