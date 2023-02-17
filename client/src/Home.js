import React, { useState } from "react";
import ReactDOM from "react-dom";
// https://codesandbox.io/s/infinite-component-onclick-oery4?file=/src/index.js

const Input = (props) => {
  return  <li className="list-group-item d-flex justify-content-between align-items-center">
  {props.name}
  <button className="btn-close" type="button" aria-label="Close"></button>
</li>;
};

const Form = () => {
  const [listItem, setItem] = useState([]);
  const [todo, setTodo] = useState([]);

  const onAddBtnClick = event => {
    setItem(listItem.concat(<Input key={listItem.length} name={todo}/>));
  };

  return (

    <div className="App">
    <div className="container my-5 d-grid gap-5">
        <header className="App-header fs-2">
          To Do List App
        </header>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-default">Enter the Task</span>
          </div>
          <input type="text" className="form-control" value={todo} aria-label="Default" aria-describedby="inputGroup-sizing-default" />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button" onClick={onAddBtnClick}>Add Task</button>
          </div>
        </div>

        <ul className="list-group">
        {listItem}
        </ul>
      </div>
  </div>
  );
};

ReactDOM.render(<Form />, document.getElementById("form"));

export default Form;
