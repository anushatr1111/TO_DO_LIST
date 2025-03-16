import { useEffect, useState } from "react";
import { todosCollection } from "../firebase";
import { getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const todoSnapshot = await getDocs(todosCollection);
      setTodos(todoSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchTodos();
  }, []);

  const toggleComplete = async (id, completed) => {
    const todoDoc = doc(todosCollection, id);
    await updateDoc(todoDoc, { completed: !completed });
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !completed } : todo));
  };

  const deleteTodo = async (id) => {
    await deleteDoc(doc(todosCollection, id));
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <span
            onClick={() => toggleComplete(todo.id, todo.completed)}
            style={{ textDecoration: todo.completed ? "line-through" : "none", cursor: "pointer" }}
          >
            {todo.text}
          </span>
          <button onClick={() => deleteTodo(todo.id)}>❌</button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
