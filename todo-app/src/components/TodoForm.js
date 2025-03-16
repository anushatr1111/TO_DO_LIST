import { useState } from "react";
import { addDoc } from "firebase/firestore";
import { todosCollection } from "../firebase";

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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default TodoForm;
