var express = require("express");
var app = express();
const storage = require("node-persist");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
storage.init();

//cors
const cors = require("cors");
app.use(cors());

// adds student
app.post("/addTodo", jsonParser, async (req, res) => {
  try {
    const todo = req.body;
    await storage.setItem(`${req.body["key"]}`, todo);
    console.log("dd", await storage.values() );
    res.send("Added student");
  } catch (err) {
    console.log(err);
  }
});

// retrieves all students sorting by student id
app.get("/allTodos", async (req, res) => {
  try {
    const students = await storage.values();
    console.log(students);
    res.json(students);
  } catch (err) {
    console.log(err);
  }
});

app.listen(5000, () => {
  console.log("Server Started");
});
