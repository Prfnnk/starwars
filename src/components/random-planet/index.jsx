import React, { useEffect, useState } from "react"
import SwapiService from "../../services/swapi-service"
import Spinner from "../spinner"
import ErrorIndicator from "../error-indicator"

import "./random-planet.css"

const RandomPlanet = () => {
  const [state, setState] = useState({
    planet: {},
    loading: true
  })

  const { planet, loading, error } = state

  const hasData = !(loading || error)

  const spinner = loading ? <Spinner /> : null
  const content = hasData ? <PlanetView planet={planet} /> : null
  const errorIndicator = error ? <ErrorIndicator /> : null

  const swapiService = new SwapiService()

  const onPlanetLoaded = (planet) => {
    setState({
      planet,
      loading: false,
      error: false
    })
  }
  const onError = (error) => {
    setState({ error: true, loading: false })
  }

  const updatePlanet = () => {
    const id = Math.floor(Math.random() * 5) + 3
    swapiService.getPlanet(id).then(onPlanetLoaded).catch(onError)
  }

  useEffect(() => {
    updatePlanet()
    setInterval(updatePlanet, 3000)
    console.log("did mount")
  }, [])

  return (
    <div className="random-planet jumbotron rounded">
      {spinner}
      {content}
      {errorIndicator}
    </div>
  )
}
export default RandomPlanet

const PlanetView = ({ planet }) => {
  const { id, name, population, rotationPeriod, diameter } = planet
  return (
    <React.Fragment>
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
    </React.Fragment>
  )
}
