import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    console.log('effect')
    axios.get('http://localhost:3001/persons').then((response) => {
      console.log('promise fulfilled')
      setPersons(response.data)
    })
  }, [])
  console.log('render', persons.length, 'persons')

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
      <Filter value={filterName} onChange={handleFilterChange} />

      <h3>Add a new</h3>
      <PersonForm onSubmit={addName} valueName={newName} onChangeName={handleNameChange} valueNumber={newNumber} onChangeNumber={handleNumberChange} />

      <h3>Numbers</h3>
      <Persons filter={filterToShow} />
    </div>
  )
}

export default App