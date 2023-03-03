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
    console.log(todo);
    //checks if student_id is unique
    await storage.setItem(await req.body["key"], todo);
    const students = await storage.values();
    console.log("dd", students);
    res.send("Added student");
  } catch (err) {
    res.send(err);
  }
});

// retrieves all students sorting by student id
app.get("/allStudents", async (req, res) => {
  try {
    const students = await storage.values();
    students.sort(
      (a, b) => parseFloat(a.student_id) - parseFloat(b.student_id)
    );
    let html = "<h2>All student data!</h2><hr>";
    students.forEach((student) => {
      html += ` <div> <h3>ID: ${student.student_id}</h1> <h3>Name: ${student.student_name}</h1> <h3>GPA: ${student.student_gpa}</h1> <hr> </div> `;
    });
    res.send(html);
  } catch (err) {
    console.log(err);
  }
});

app.listen(5000, () => {
  console.log("Server Started");
});
