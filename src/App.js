import React, {Component} from 'react';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      report: undefined,
      date: undefined,
      buttonText: 'Pesquisar',
      buttonStyle: 'btn-success',
      searching: false
    }
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          Teste
        </div>
      </div>
    );
  }
}

export default App;
