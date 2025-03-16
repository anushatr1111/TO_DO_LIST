import { useState } from "react";
import { addDoc } from "firebase/firestore";
import { todosCollection } from "../firebase";
import "../styles/ToDoForm.css";
import TodoList from "./ToDoList";
function TodoForm() {
  const [task, setTask] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (task.trim()) {
      await addDoc(todosCollection, { text: task, completed: false });
      setTask("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a new task..."
        className="todo-input"
      />
      <button type="submit" className="add-btn">➕ Add</button>
    </form>
  );
}

export default TodoForm;
