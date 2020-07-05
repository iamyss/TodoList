const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoList = new Schema({
    title: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    list: [
        {
            body: String,
            completed: Boolean,
            added: Date,
        }
    ]
});
const todoList = mongoose.model("TodoList", TodoList);
module.exports = todoList;