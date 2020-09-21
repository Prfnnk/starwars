import React, { useState, useEffect, useRef } from "react"
import SwapiService from "../../services/swapi-service"

import "./person-details.css"

const PersonDetails = ({ personId }) => {
  const [person, setPerson] = useState()

  const updatePerson = (personId) => {
    const swapiService = new SwapiService()
    if (!personId) {
      return
    }
    swapiService.getPerson(personId).then((person) => {
      setPerson(person)
    })
    console.log(personId, "updPerson")
  }

  useEffect(() => {
    updatePerson(personId)
  }, [personId])

  if (!person) {
    return <span>Select a person from a list</span>
  }

  const { id, name, gender, birthYear, eyeColor } = person

  return (
    <div className="person-details card">
      <img
        className="person-image"
        src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
        alt="person"
      />

      <div className="card-body">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Gender</span>
            <span>{gender}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Birth Year</span>
            <span>{birthYear}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Eye Color</span>
            <span>{eyeColor}</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
export default PersonDetails
