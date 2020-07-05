const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
const port = process.env.PORT || 8080;

mongoose.connect("mongodb://localhost:27017/todo-list", (err) => {
    if (!err) {
        console.log("Mongo db connected!");
    } else {
        console.log(err);
        process.exit(1);
    }
});

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json());

app.use(express.static('build'))

app.use("/api/user", require("./api/user"));

app.use(async (req, res, next) => {
    console.log(req.headers["authorization"]);
    jwt.verify(req.headers["authorization"], "1234567890", (err, decoded) => {
        if (!err && decoded) {
            req.user = decoded.user;
            next();
        } else {
            res.status(401).json({
                message: "Invaild token!"
            });
        }
    })
});

app.use("/api/list", require("./api/list"));

app.listen(port, (err) => {
    if (!err) {
        console.log("Listening on PORT", port);
    } else {
        console.log(err);
        process.exit(1);
    }
})