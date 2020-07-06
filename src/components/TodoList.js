import React from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import axios from "axios";
import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

export default class TodoList extends React.Component {
  state = {
    todos: [],
    todosToShow: "all",
  };

  componentWillMount() {
    let token = localStorage.getItem("token") || undefined;
    if (!token) {
      window.location.replace("/");
    } else {
      this.getToDoLists();
    }
  }

  getToDoLists = () => {
    axios
      .get("http://localhost:8080/api/list", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        this.setState({
          todos: res.data.list,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  addTodo = (title) => {
    axios
      .post(
        "http://localhost:8080/api/list",
        {
          title: title,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        this.getToDoLists();
      })
      .catch((err) => {
        console.log(err);
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
      <Container
        style={{
          backgroundColor: "powderblue",
          margin: "0px 0px",
          radius: "5px",
        }}
      >
        <AppBar position="static">
          <Toolbar>
            <AssignmentOutlinedIcon edge="start" />
            <Typography variant="h6">MY TODOLIST APP</Typography>
            <Button
              variant="contained"
              color="secondary"
              container
              justify="flex-end"
              onClick={() => {
                localStorage.setItem("token", "");
                window.location.replace("/");
              }}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>

        <div>
          <Grid
            container
            style={{ flexGrow: 1, marginTop: "40px" }}
            spacing={2}
          >
            <Grid item xs={12}>
              <Grid container justify="center">
                <TodoForm onSubmit={this.addTodo} />
              </Grid>
            </Grid>
            <Grid container xs={12} sm={12} md={12} lg={12} justify="center">
              <Grid item xs={2} sm={2} md={2} lg={2}></Grid>
              <Grid container xs={8} sm={8} md={8} lg={8}>
                {todos.map((todo) => (
                  <div>
                    <Todo
                      key={todo._id}
                      toggleComplete={() => this.toggleComplete(todo.id)}
                      onDelete={() => this.handleDeleteTodo(todo.id)}
                      todo={todo}
                    />
                    <br />
                  </div>
                ))}
              </Grid>
              <Grid item xs={2} sm={2} md={2} lg={2}></Grid>
            </Grid>
            {/* <div>
                        Todos Left :{" "}
                        {this.state.todos.filter((todo) => !todo.complete).length}
                    </div>
                    <div>
                        <button onClick={() => this.updateTodoToShow("all")}>All</button>
                        <button onClick={() => this.updateTodoToShow("active")}>Active</button>
                        <button onClick={() => this.updateTodoToShow("complete")}>Complete</button>
                        {this.state.todos.some((todo) => todo.complete) ? (
                            <div>
                                <button onClick={this.removeAllTodoThatAreComplete}>Remove All Complete Todos</button>
                            </div>
                        ) : null}
                        <br /> */}
            {/* </div> */}
          </Grid>
        </div>
      </Container>
    );
  }
}
