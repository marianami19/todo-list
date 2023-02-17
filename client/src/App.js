import './App.css';
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
  );
}

export default App;
