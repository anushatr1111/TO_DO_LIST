import React from 'react';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import '../styles/App.css';

function Home() {
  return (
    <div className="app">
      <main className="container">
        <h1>To-Do List</h1>
        <TodoForm />
        <TodoList />
      </main>
    </div>
  );
}

export default Home;