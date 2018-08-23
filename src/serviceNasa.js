import axios from 'axios';
import {Asteroid, Report} from 'models'

const apiKey = '&api_key=Fzl4djXE6IjuT1jezIiRtyAYtP50CF6waDnoN8Lx'
const baseUrl = 'https://api.nasa.gov/neo/rest/v1/feed?start_date='

async function getAsteroids(date) {
  const asteroids = await getAsteroidsInApi(date)
  return new Report(asteroids)
}

async function getAsteroidsInApi(date) {
  let asteroidsList
  let self = this

  axios.get(`${baseUrl}${date}${apiKey}`)
    .then(response => {
      self.asteroidsList = response.data
    })

  return bindAsteroidList(this.asteroidsList, date)
}

function bindAsteroidList(asteroidList, date) {
  const countAsteroids = asteroidList.element_count
  const asteroids = countAsteroids === 0 ? [] : asteroidList.near_earth_objects[date]

  return asteroids.map(asteroid => bindAsteroid(asteroid))
}

function bindAsteroid(asteroid) {
  let name = asteroid.name
  let diameter = asteroid.estimated_diameter.meters.estimated_diameter_max
  let distance = asteroid.close_approach_data[0].miss_distance.kilometers
  let isDanger = asteroid.is_potentially_hazardous_asteroid

  return new Asteroid(name, diameter, distance, isDanger)
}

export default getAsteroids