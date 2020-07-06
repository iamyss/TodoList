import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

export default class ToDo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: this.sort(this.props.todo),
    };
    this.addToList = this.addToList.bind(this);
    this.listItemCompleted = this.listItemCompleted.bind(this);
    this.remoteTask = this.remoteTask.bind(this);
    this.removeList = this.removeList.bind(this);
  }

  sort(todo) {
    let arr = todo.list;
    let newArr;
    let checked = arr.filter((el) => el.completed);
    let unchecked = arr.filter((el) => !el.completed);
    todo.list = [...unchecked, ...checked];
    return todo;
  }

  removeList() {
    axios
      .post(
        "http://localhost:8080/api/list/delete",
        {
          list: this.state.todo._id,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        window.location.replace("/");
      })
      .catch((err) => {
        window.location.replace("/");
      });
  }

  listItemCompleted(i, evt) {
    let obj = this.state.todo;
    obj.list[i].completed = evt.target.checked;
    this.setState({
      todo: obj,
    });

    axios
      .post(
        "http://localhost:8080/api/list/update",
        {
          list: obj,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        this.setState({ todo: this.sort(res.data) });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  remoteTask(i) {
    let obj = this.state.todo;
    obj.list.splice(i, 1);
    this.setState({
      todo: obj,
      newTodo: "",
    });

    axios
      .post(
        "http://localhost:8080/api/list/update",
        {
          list: obj,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        this.setState({ todo: this.sort(res.data) });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addToList(e) {
    e.preventDefault();
    let obj = this.state.todo;
    obj.list.push({
      body: this.state.newTodo,
      completed: false,
      added: new Date(),
    });
    this.setState({
      todo: obj,
      newTodo: "",
    });

    axios
      .post(
        "http://localhost:8080/api/list/update",
        {
          list: obj,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        this.setState({ todo: this.sort(res.data) });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <Accordion square expanded={true} style={{ margin: "1%" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{this.state.todo.title}</Typography>
          <DeleteIcon
            style={{
              color: "red",
              float: "right",
              cursor: "hand",
            }}
            onClick={this.removeList}
          />
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {this.state.todo.list.map((l, i) => {
              return (
                <div key={i}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={l.completed}
                        onChange={(evt) => this.listItemCompleted(i, evt)}
                        name="checkedB"
                        color="primary"
                      />
                    }
                    label={l.body}
                  />
                  <HighlightOffIcon
                    color="primary"
                    style={{ float: "right", cursor: "hand" }}
                    onClick={() => {
                      this.remoteTask(i);
                    }}
                  />
                </div>
              );
            })}
            <form onSubmit={this.addToList}>
              <FormControl>
                <InputLabel htmlFor="my-input">Add to list</InputLabel>
                <Input
                  value={this.state.newTodo}
                  onChange={(e) => this.setState({ newTodo: e.target.value })}
                  id="my-input"
                  aria-describedby="my-helper-text"
                />
              </FormControl>
            </form>
          </Typography>
        </AccordionDetails>
      </Accordion>
    );
  }
}
