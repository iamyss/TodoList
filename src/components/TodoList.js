import React from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
export default class TodoList extends React.Component {
  state = {
    todos: [],
    todosToShow: "all",
  };

  addTodo = (todo) => {
    this.setState({
      todos: [todo, ...this.state.todos],
    });
  };

  toggleComplete = (id) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            complete: !todo.complete,
          };
        } else {
          return todo;
        }
      }),
    });
  };

  updateTodoToShow = (s) => {
    this.setState({
      todosToShow: s,
    });
  };

  handleDeleteTodo = (id) => {
    console.log(id);
    this.setState({
      todos: this.state.todos.filter((todo) => todo.id !== id),
    });
  };

  removeAllTodoThatAreComplete = () => {
    this.setState({
      todos: this.state.todos.filter((todo) => !todo.complete),
    });
  };

  render() {
    let todos = [];
    if (this.state.todosToShow === "all") {
      todos = this.state.todos;
    } else if (this.state.todosToShow === "active") {
      todos = this.state.todos.filter((todo) => !todo.complete);
    } else if (this.state.todosToShow === "complete") {
      todos = this.state.todos.filter((todo) => todo.complete);
    }
    return (
      <div>
        <TodoForm onSubmit={this.addTodo} />
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            toggleComplete={() => this.toggleComplete(todo.id)}
            onDelete={() => this.handleDeleteTodo(todo.id)}
            todo={todo}
          />
        ))}
        <div>
          Todos Left :{" "}
          {this.state.todos.filter((todo) => !todo.complete).length}
        </div>
        <div>
          <button onClick={() => this.updateTodoToShow("all")}>all</button>
          <button onClick={() => this.updateTodoToShow("active")}>
            active
          </button>
          <button onClick={() => this.updateTodoToShow("complete")}>
            complete
          </button>
          {this.state.todos.some((todo) => todo.complete) ? (
            <div>
              <button onClick={this.removeAllTodoThatAreComplete}>
                Remove All Complete Todos
              </button>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
