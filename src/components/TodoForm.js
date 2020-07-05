import React from "react";
import shortid from "shortid";

export default class TodoForm extends React.Component {
    state = {
        text: "",
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state.text);
        this.setState({
            text: "",
        });
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    name="text"
                    value={this.state.text}
                    onChange={this.handleChange}
                    placeholder="Enter title here..."
                />
                <button onClick={this.handleSubmit}>New List</button>
            </form>
        );
    }
}
