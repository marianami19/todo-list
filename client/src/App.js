import "./App.css";
import React, { useState, useEffect } from "react";

const Tasks = (props) => {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      {props.name}
      <button className="btn-close" type="button" aria-label="Close"></button>
    </li>
  );
};

function App() {
  const [listItem, setItem] = useState([]);
  const [name, setName] = useState("");
  const [key, setKey] = useState();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllToDos();
  }, [])

  const getAllToDos = async () => {
    await fetch(`http://localhost:5000/allTodos`)
      .then(res => res.json())
      .then(
        (result) => {
          setData(result);
          setKey(result.length)
    displayTodos(result)

          console.log('result',result);
        },
        (error) => {
          setError(error);
          console.log(error);
        }
      )
  }

  const displayTodos = (data) => {
    setItem([]);
    if (!!data) {
      // data.sort((element) => element.key);

      data.forEach(element => {
        console.log('data element --', element)
        setItem(items => [...items, <Tasks key={element.key} name={element.name} />])
      });
    }

    console.log('key = ', key)
    console.log('data', data)

  }
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
      //  setItem(items => [...items, <Tasks key={element.key} name={element.name} />])
    } catch (err) {
      console.log(err);
    }
    setName('');

  };

  return (
    <div className="App">
      <div className="container my-5 d-grid gap-5">
        <header className="App-header fs-2">To Do List App</header>
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
              placeholder="Enter Task"
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
