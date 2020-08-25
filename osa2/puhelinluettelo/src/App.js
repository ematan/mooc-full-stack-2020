import React, { useState } from 'react'

const Person = ({person}) => {
  return (
    <p>{person.name}  {person.number}</p>
  )
}

const Persons = ({persons}) => (
  <div>
    {persons.map(p => <Person key={p.name} person={p} />)}
  </div>
)

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



const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ newShow, setShow ] = useState(persons)

  const addName = (event) => {
    event.preventDefault()
    //console.log('button: ', event.target)

    let isNameNew = (persons.filter(p => p.name===newName)).length === 0
    
    if (isNameNew) {
      const nameObj = {
        name: newName,
        number: newNumber
      }
      const temp = persons.concat(nameObj)
      setPersons(temp)
      setNewName('')
      setNewNumber('')
      setShow(filteredPersons(temp, newFilter))
      console.log("show", temp)
    } else {
      window.alert(`${newName} is already added`)
    }
  }

  function filteredPersons(per, fil) {
    return per.filter(p => p.name.toLowerCase().includes(fil.toLowerCase()))
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
    setShow(filteredPersons(persons, value))
  }


  return (
    <div>
      <h2>Phonebook</h2>
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
      <Persons persons={newShow} />
    </div>
  )

}

export default App