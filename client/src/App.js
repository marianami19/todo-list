import './App.css';

function App() {
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
            <input type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button">Add Task</button>
            </div>
          </div>

          <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              A list item
              <button className="btn-close" type="button" aria-label="Close"></button>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              A second list item
              <button className="btn-close" type="button" aria-label="Close"></button>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              A third list item
              <button className="btn-close" type="button" aria-label="Close"></button>
            </li>
          </ul>
        </div>
    </div>
  );
}

export default App;
