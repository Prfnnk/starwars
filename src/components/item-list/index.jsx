import React, { useState, useEffect } from "react"
import SwapiService from "../../services/swapi-service"
import Spinner from "../spinner"

import "./item-list.css"

const ItemList = ({ onItemSelected }) => {
  const swapiService = new SwapiService()

  const [state, setState] = useState({
    peopleList: null
  })
  const { peopleList } = state

  useEffect(() => {
    swapiService.getAllPeople().then((peopleList) => {
      setState({ peopleList })
    })
  }, [])

  const renderItems = (arr) => {
    return arr.map(({ id, name }) => {
      return (
        <li
          className="list-group-item"
          key={id}
          onClick={() => onItemSelected(id)}>
          {name}
        </li>
      )
    })
  }

  if (!peopleList) {
    return <Spinner />
  }

  const items = renderItems(peopleList)

  return <ul className="item-list list-group">{items}</ul>
}

export default ItemList
