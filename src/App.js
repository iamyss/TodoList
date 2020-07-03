import React from "react";
import "./App.css";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <TodoList />
    </div>
  );
}

export default App;
