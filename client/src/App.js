import './App.css';
<<<<<<< HEAD
import Form from './Home';

function App() {
    state = {
    numChildren: 0
  }
  const children = [];
  for (var i = 0; i < this.state.numChildren; i += 1) {
    children.push(<ListItem key={i} number={i} />);
  };

  onAddChild = () => {
    this.setState({
      numChildren: this.state.numChildren + 1
    });
  }

  return (

   <Form></Form>
=======

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
>>>>>>> 0666aa64467528b0865062d898231c169de9edd1
  );
}

export default App;
