import React, {Component} from 'react';
import axios from 'axios';

const apiKey = '&api_key=Fzl4djXE6IjuT1jezIiRtyAYtP50CF6waDnoN8Lx'
const baseUrl = 'https://api.nasa.gov/neo/rest/v1/feed?start_date='

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      asteroidsList: [],
      date: ''
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
          <label>
            Date:
            <input type="date" value={this.state.date} onChange={this.handleChange} name="date"/>
          </label>
          <ul className={'list-unstyled accordion mb-3'}>{this.__dataTable()}</ul>
        </div>
      </div>
    );
  }

  __dataTable() {
    if (this.state.asteroidsList) {
      let listItems = this.state.asteroidsList.map((item, index) =>
        <li key={index}>{this.__dataCard(item, index)}
        </li>
      )
      return listItems
    }
  }

  __dataCard(item, index) {
    let card = <div className="card">
      <div className="card-header" id={`heading${index}`}>
        <h5 className="mb-0">
          <button className="btn btn-link collapsed" type="button" data-toggle="collapse"
                  data-target={`#collapse${index}`}
                  aria-expanded="true" aria-controls="collapseOne">
            Nome: {item.name}
          </button>
        </h5>
      </div>

      <div id={`collapse${index}`} className="collapse show" aria-labelledby={`heading${index}`}
           data-parent="#accordionExample">
        <div className="card-body">
          <div>
            Diametro dessa caralha: {Math.floor(item.estimated_diameter.meters.estimated_diameter_max)} Metros
          </div>
          <div>
            Distância que vai passar da terra: {item.close_approach_data[0].miss_distance.kilometers} KM
          </div>
          <div>
            É uma ameaça?{this.__isDanger(item.is_potentially_hazardous_asteroid)}
          </div>
        </div>
      </div>
    </div>

    return card
  }

  __isDanger(asteroidPotential) {
    let danger
    if (asteroidPotential) {
      danger = <span className="badge badge-danger">Sim</span>
    } else {
      danger = <span className="badge badge-success">Não</span>
    }

    return danger
  }
}

export default App;
