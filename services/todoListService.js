const User = require("../models/users");
const TodoList = require("../models/todolist");
const mongoose = require("mongoose");

const createTodoList = async (user, title) => {
    try {
        let list = new TodoList({
            title: title,
            user: mongoose.Types.ObjectId(user)
        });
        list = await list.save();
        return list;
    } catch (ex) {
        console.log(ex);
        throw ex;
    }
}

const getUserLists = async (user) => {
    try {
        let list = await TodoList.find({
            user: mongoose.Types.ObjectId(user)
        });
        return list;
    } catch (ex) {
        console.log(ex);
        throw ex;
    }
}

const updateList = async (newlist) => {
    try {
        let list = await TodoList.findById(newlist._id);
        list.list = newlist.list;
        list = await list.save();
        return list;
    } catch (ex) {
        console.log(ex);
        throw ex;
    }
}

const deleteList = async (list) => {
    try {
        await TodoList.deleteOne({
            _id: list
        });
    } catch (ex) {
        console.log(ex);
        throw ex;
    }
}

module.exports = {
    createTodoList, getUserLists, updateList, deleteList
}