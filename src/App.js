import React, {Component} from 'react';
import axios from 'axios';

const apiKey = '&api_key=Fzl4djXE6IjuT1jezIiRtyAYtP50CF6waDnoN8Lx'
const baseUrl = 'https://api.nasa.gov/neo/rest/v1/feed?start_date='

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      asteroidsList: [],
      date: 'yyyy-MM-dd'
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.getAsteroids(event.target.value)
  }

  getAsteroids(date) {
    axios.get(`${baseUrl}${date}${apiKey}`)
      .then(response => {
        this.setState({
          asteroidsList: response.data.near_earth_objects[date]
        })
      })
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <form>
            <label>
              Date:
              <input type="date" value={this.state.date} onChange={this.handleChange} name="date"/>
            </label>
          </form>
          <ul className={'list-unstyled'}>{this.__dataTable()}</ul>
        </div>
      </div>
    );
  }

  __dataTable() {
    if (this.state.asteroidsList) {
      let listItems = this.state.asteroidsList.map((item, index) =>
        <li key={index} className={'mb-3'}>
          <div>
            Nome: {item.name}
          </div>
          <div>
            Diametro dessa caralha: {Math.floor(item.estimated_diameter.meters.estimated_diameter_max)} Metros
          </div>
          <div>
            É uma ameaça? {item.is_potentially_hazardous_asteroid ?
            <span className="badge badge-success">Não</span> :
            <span className="badge badge-danger">Sim</span>}
          </div>
        </li>
      )
      return listItems
    }
  }
}

export default App;
