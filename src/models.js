class Asteroid {
  constructor(name, diameter, distance, isDanger) {
    this.name = name
    this.diameter = diameter
    this.distance = distance
    this.isDanger = isDanger
  }
}

class Report {
  constructor(asteroids) {
    this.dangerAsteroids = asteroids.filter(asteroid => asteroid.isDanger)
    this.nonDangerAsteroids = asteroids.filter(asteroid => !asteroid.isDanger)
  }
}

export {Asteroid}