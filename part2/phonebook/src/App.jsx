import { useState, useEffect } from 'react'
import personService from './services/persons'
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
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons)
      })
  }, [])

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

   personService.create(personObject).then(returnedPerson => {
      console.log(returnedPerson)
      setPersons(persons.concat(returnedPerson))
      
      setNewName('')
      setNewNumber('')
    })
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
  const deletePerson = (event) => {
    console.log(event.target.value);
    const id = event.target.value
    const person = persons.find((n) => n.id === id)
    if (confirm(`delete ${person.name}`) == true) {
      personService.erase(id).then(() => {
      setPersons(persons.filter((n) => n.id !== id))
    }).catch((error) => {
        alert(`the note '${person.content}' was already deleted from server`)
        setPersons(persons.filter((n) => n.id !== id))
      })
    } else {
      return
    }
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
      <Persons filter={filterToShow} erase={deletePerson}/>
    </div>
  )
}

export default App