const mysql = require('mysql');
//cors
const cors = require('cors');
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
//express
var express = require('express');
var app = express();
var corsOptions = {
    origin: "http://localhost:5000"
};

app.use(cors());
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "todolist"
})



// conn.query("create table todos(todoid int NOT NULL AUTO_INCREMENT, todoname varchar(255), PRIMARY KEY(todoid))")

// retrieves all todos sorting by todo key descending
conn.connect(function (err) {
    if (err) {
        throw err;
    }
    console.log("Connected")
})

var todos;

app.get('/allTodos', function (req, res) {
    try {
        conn.query("select * from todos", function (err, result) {
            if (err) {
                console.log(err);
            }
            res.send(result)

        })
    } catch (err) {
        console.log(err);
    }
})

app.post("/addTodo", jsonParser, async (req, res) => {
    try {
        const todo = req.body;
        console.log('todo', todo)
        conn.query(`insert into todos(todoname, todoid) values('${todo.name}', ${todo.key})`)

    } catch (err) {
        console.log(err);
    }
});


// app.post('/addTodo', function (req, res) {
//     console.log('add ',req.body)
// conn.query("select * from todos", function (err, res, fields) {
//     if (err) {
//         console.log(err)
//     }
// })

// conn.query(`insert into todos(todoname) values("cook")`)

//  res.status('Hello World', res)
// conn.close();
// })
// app.post('/addTodo', function (req, res) {
//     console.log('add ',req.body)
//     // conn.query(`insert into todos(todoname) values("cook")`)
//     // res.send('Added')
// })

app.listen(5000, () => {
    console.log("Server Started!");
})