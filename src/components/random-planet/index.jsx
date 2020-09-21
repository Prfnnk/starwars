import React, { useEffect, useState } from "react"
import SwapiService from "../../services/swapi-service"

import "./random-planet.css"

const RandomPlanet = () => {
  const [state, setState] = useState({
    planet: {}
  })

  const {
    planet: { id, name, population, rotationPeriod, diameter }
  } = state

  const swapiService = new SwapiService()

  const updatePlanet = () => {
    const id = Math.floor(Math.random() * 25) + 2
    swapiService.getPlanet(id).then((planet) => {
      setState({
        planet
      })
    })
  }

  useEffect(() => {
    updatePlanet()
  }, [])

  return (
    <div className="random-planet jumbotron rounded">
      <img
        className="planet-image"
        src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
        alt={`${name}`}
      />
      <div>
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Population</span>
            <span>{population}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Rotation Period</span>
            <span>{rotationPeriod}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Diameter</span>
            <span>{diameter}</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
export default RandomPlanet
