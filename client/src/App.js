import "./App.css";
import React, { useState, useEffect }  from "react";

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
  const getAllToDos = async() => {
    try {
       fetch('http://localhost:5000/allTodos')
       .then(response => response.json())
       .then( data => console.log(data))
       //   data.array.forEach(element => {
       //   setItem(listItem.concat(<Input key={element.key} name={element.name} />))
       // })
  } catch (err) {
    console.log(err);
  }
}


useEffect(() => {
  getAllToDos()
}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let key = listItem.length;
      const body = { name, key };
      await fetch("http://localhost:5000/addTodo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setItem(listItem.concat(<Tasks key={key} name={name} />));
    } catch (err) {
      console.log(err);
    }
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
