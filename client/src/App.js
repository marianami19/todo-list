import "./App.css";
import React, { useState, useEffect, Fragment, useCallback } from "react";

// Code for each todo list item, returns html to App(), accepts name and key as parameters
const Tasks = (props) => {

  // function triggered on click of cross button and deletes the todo item based on key(id)
  const deleteTodo = async (key) => {
    try {
      fetch('http://localhost:5000/deleteTodo/' + key, {
        method: 'DELETE',
      })
        .then(res => res.json()) 
        .then(res => console.log('res', res))
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Fragment>
      <li className="list-group-item w-50 m-auto my-2 d-flex ">
        <div>{props.name}</div>
        <button type="button" className="btn-close ms-auto" onClick={() => deleteTodo(props.index)} aria-label="Close"></button>
      </li>
    </Fragment>
  );
};

// main code
function App() {
  const [listItem, setItem] = useState([]);
  const [name, setName] = useState("");
  const [key, setKey] = useState();


  // retrieves todos from backend, sets unique key for next todo
  const getAllToDos = useCallback(async () => {
    await fetch(`http://localhost:5000/allTodos`)
      .then(res => res.json())
      .then(
        (result) => {
          console.log('result frontend', result);
          let maxKey = Math.max(...result.map(o => o.todoid), 1);
          // set the key of next element
          setKey(maxKey + 1);
          //display function called with data retrieved as parameter
          displayTodos(result);
        },
        (error) => {
          console.log('error', error);
        }
      );
  }, [])



  useEffect(
    () => {
      getAllToDos();
    },
    [listItem, getAllToDos]
  )


  // loops through the data and sets listItem which is an array of the tasks in html
  const displayTodos = (data) => {
    setItem([]);
    if (!!data) {
      data.forEach(element => {
        setItem(items => [...items, <Tasks key={element.todoid} index={element.todoid} name={element.todoname} />])
      });
    }
  }

  // adds a new todo with name and key
  const handleSubmit = async (e) => {
    try {
      const body = { name, key };
      console.log('--', body)
      await fetch("http://localhost:5000/addTodo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      }).then(
        getAllToDos()
      )
    } catch (err) {
      console.log(err);
    }
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
