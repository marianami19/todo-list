import "./App.css";
import React, { useState, useEffect } from "react";

// Code for each todo
const Tasks = (props) => {
  return (
    <li className="list-group-item w-50 m-auto my-2">
      {props.name}
    </li>
  );
};

// main code
function App() {
  const [listItem, setItem] = useState([]);
  const [name, setName] = useState("");
  const [key, setKey] = useState();

  useEffect(() => {
    getAllToDos();
  }, [])

  // retrieves todos from backend, sets unique key for next todo
  const getAllToDos = async () => {
    await fetch(`http://localhost:5000/allTodos`)
      .then(res => res.json())
      .then(
        (result) => {
          setKey(result.length)
          //display function called with data retrieved as parameter
          displayTodos(result)
        },
        (error) => {
          console.log(error);
        }
      )
  }

  // loops through the data and sets listItem which is an array of the tasks in html
  const displayTodos = (data) => {
    setItem([]);
    if (!!data) {
      data.forEach(element => {
        setItem(items => [...items, <Tasks key={element.key} name={element.name} />])
      });
    }
  }

  // adds a new todo with name and key
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { name, key };
      await fetch("http://localhost:5000/addTodo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      getAllToDos();
    } catch (err) {
      console.log(err);
    }
    setName('');
  };

  return (
    <div className="App">
      <div className="  container my-5 d-grid gap-5">
        <header className="display-3 text-light">To do Today</header>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">
                Enter the Task
              </span>
            </div>
            <input
              className="form-control"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Buy groceries..."
              required
            />

            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="submit">
                Add Task
              </button>
            </div>
          </div>
        </form>
        <ul className="list-group">
          {listItem}
        </ul>
      </div>
    </div>
  );
}

export default App;
