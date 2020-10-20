import React from 'react'
import personService from '../services/persons'

const DelButton = ({person, setPersons, persons}) => {
  const handleDelClick = () => {
    const result = window.confirm(`Delete ${person.name}`)
    if (result) {
      personService
        .remove(person.id)
        .catch(e =>
          alert("already removed")
        )
      setPersons(persons.filter(p => p.id !== person.id))
    } else window.alert("Operation cancelled")
  }
  return (
    <button onClick={handleDelClick}>delete</button>
  )
}

const Person = ({person, setPersons, persons}) => {
  return (
    <p>{person.name}  {person.number} <DelButton person={person} setPersons={setPersons} persons={persons}/></p>
  )
}

const PersonList = ({persons, filter, setPersons}) => {
  const filtered = persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
  return(
  <div>
    {filtered.map(p => <Person key={p.name} person={p} setPersons={setPersons} persons={persons}/>)}
  </div>
  )
}

export default PersonList