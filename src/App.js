import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import "./App.css";
import TodoList from "./components/TodoList";
function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <SignIn />
                </Route>
                <Route exact path="/signin">
                    <SignIn />
                </Route>
                <Route path="/todolist">
                    <TodoList />
                </Route>
                <Route exact path="/signup">
                    <SignUp />
                </Route>
            </Switch>
        </Router>


    );
}

export default App;
