import { useState } from 'react'

const Person = ({ person }) => {
  return <p>{person.name} {person.number}</p>
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
      
    }
    
    if(persons.some(person => person.name === newName)){
      alert(`${newName.name} is already in the phonebook`)
      return
    }
    setPersons(persons.concat(personObject))
    
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
}
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
}
  const handleFilterChange = (event) => {
    setFilterName(event.target.value)
}

  const filterToShow = filterName != ''
    ? persons.filter(person => person.name.toLowerCase().includes(filterName))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input 
          value={filterName}
          onChange={handleFilterChange}
          />
      </div>
      <h2>Add New</h2>
      <form onSubmit={addName}>
        <div>
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
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {filterToShow.map(person =>
          <Person key={person.name} person={person} />
        )}
    </div>
  )
}

export default App