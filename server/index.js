const mysql = require('mysql');
//cors
const cors = require('cors');
//express
var express = require('express');
var app = express();

app.use(cors());
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "todolist"
})

conn.connect(function (err) {
    if (err) {
        throw err;
    }
    console.log("Connected")
})

// conn.query("create table todos(todoid int NOT NULL AUTO_INCREMENT, todoname varchar(255), PRIMARY KEY(todoid))")

app.get('/retrieveAllToDos', function (req, res) {

    conn.query("select * from todos", function (err, res, fields) {
        if (err) {
            console.log(err)
        }
    })
    

    res.send('Hello World', res)
    conn.close();
})
app.get('/addToDo', function (req, res) {
    conn.query(`insert into todos(todoname) values("cook")`)
    res.send('Added')
})

app.listen(5000, () => {
    console.log("Server Started!");
})