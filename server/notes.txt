var express = require("express");
var app = express();
const storage = require("node-persist");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
const cors = require("cors");
app.use(cors());

// initialize and empty storage 
const clearStorage = async () => {
  await storage.init();
  await storage.clear();
}

clearStorage();


// adds todo - name with unique key to node persist
app.post("/addTodo", jsonParser, async (req, res) => {
  try {
    const todo = req.body;
    await storage.setItem(`${req.body["key"]}`, todo);
    res.send("Added!");
  } catch (err) {
    console.log(err);
  }
});

// retrieves all todos sorting by todo key descending
app.get("/allTodos", async (req, res) => {
  try {
    const todos = await storage.values();
    todos.sort((a,b) => b.key - a.key);
    res.json(todos);
  } catch (err) {
    console.log(err);
  }
});

app.listen(5000, () => {
  console.log("Server Started");
});
