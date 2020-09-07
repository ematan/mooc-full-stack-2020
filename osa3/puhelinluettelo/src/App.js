import React, { useState, useEffect } from 'react'
//import axios from 'axios'
import personService from './services/persons'
import './App.css'

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

const Persons = ({persons, filter, setPersons}) => {
  const filtered = persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
  return(
  <div>
    {filtered.map(p => <Person key={p.name} person={p} setPersons={setPersons} persons={persons}/>)}
  </div>
  )
}

const PersonForm = ({addName, newName, newNumber, handleNameChange, handleNumberChange}) => {
  //console.log("aa", newName)
  return (
    <form onSubmit={addName}>
      <div>
          name: <input 
                  value={newName} 
                  onChange={handleNameChange}
                />
        </div>
        <div>
          number: <input 
                  value={newNumber} 
                  onChange={handleNumberChange}
                />
        </div>
        
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )

}

const Filter = ({newFilter, handleFilterChange}) => (
  <input  value={newFilter} 
          onChange={handleFilterChange}
  />
)

const Notification = ({message}) => {
  if (!message) return null
  return (
    <div className={`notification ${message.color}`}>
      {message.msg}
    </div>
  )
}


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ message, setMessage] = useState(null)

  const getHook = () => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
        //console.log("loaded")
      })
  }

  useEffect(getHook, [])

  //console.log('render', persons.length, 'persons')

  const addName = (event) => {
    event.preventDefault()

    let isNameNew = (persons.filter(p => p.name===newName)).length === 0
    
    if (isNameNew) {
      const nameObj = {
        name: newName,
        number: newNumber
      }
      personService
        .create(nameObj)
        .then(response => {
          const returned = response.data
          setPersons(persons.concat(returned))
          setNewName('')
          setNewNumber('')
          setMessage({
            msg: `Added ${returned.name}`,
            color: 'green' 
          })
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(e => {
          setMessage({
            msg: e.response.data,
            color: 'red'
          })
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
    } else {
      const res = window.confirm(`${newName} is already added. Replace old number?`)
      if (res) {
        const oldP = persons.find(p => p.name === newName)
        const editedP = {...oldP, number: newNumber}
        personService
          .update(editedP.id, editedP)
          .then(response => {
            const returned = response.data
            setPersons(persons.map(p=> p.name !== newName ? p : returned ) )
            setMessage({
              msg: `Changed number for ${returned.name}`,
              color: 'green'
            })
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(error => {
            setMessage({
              msg: `Information of ${newName} has already been removed from server`,
              color: 'red'
            })
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
      } else {
        window.alert("OK")
      }
      
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    const value = event.target.value
    setNewFilter(value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <p>filter shown with 
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      
    </p>
      <h2>add a new</h2>
      <PersonForm addName={addName}
                  newName={newName}
                  newNumber={newNumber}
                  handleNameChange={handleNameChange}
                  handleNumberChange={handleNumberChange}                  
                  />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={newFilter} setPersons={setPersons} />
    </div>
  )

}

export default App