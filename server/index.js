const mysql = require('mysql');
//cors
const cors = require('cors');
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
//express
var express = require('express');
var app = express();

app.use(cors());
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "todolist"
})

// conn.query("create table todos(todoid int NOT NULL, todoname varchar(255), PRIMARY KEY(todoid))")

conn.connect(function (err) {
    if (err) {
        throw err;
    }
    console.log("Connected")
})

// retrieves all todos order by todo id descending
app.get('/allTodos', function (req, res) {
    try {
        conn.query("select * from todos ORDER BY todoid DESC;", function (err, result) {
            if (err) {
                console.log(err);
            }
            res.send(result)
        })
    } catch (err) {
        console.log(err);
    }
})

//deletes todo with id
app.delete('/deleteTodo/:id', function (req, res, next) {
    try {
        var id = req.params.id;
        var sql = `DELETE FROM todos WHERE todoid = ${id}`;
        conn.query(sql, [id], function (err, data) {
            if (err) throw err;
            console.log(data.affectedRows + " record(s) updated");
            res.send(data);
        });
    } catch (err) {
        console.log(err);
    }

});

//adds new todo
app.post("/addTodo", jsonParser, async (req, res) => {
    try {
        const todo = req.body;
        conn.query(`insert into todos(todoname, todoid) values('${todo.name}', ${todo.key})`)

    } catch (err) {
        console.log(err);
    }
});

app.listen(5000, () => {
    console.log("Server Started!");
})