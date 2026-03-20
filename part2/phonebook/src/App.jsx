import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [message, setMessage] = useState([])

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
      if (confirm(`${newName} is already added in the phonebook, replace the old number with a new one?`) == true){
        const person = persons.find((n) => n.name === newName)
        const changedPerson = { ...person, number: newNumber}

        personService.update(person.id, changedPerson).then((returnedPerson) => {
        setPersons(persons.map((persons) => (persons.id !== person.id ? persons : returnedPerson)))
        setMessage({
          message: `Changed number ${newName} to ${newNumber}`,
          type: 'success'
          })
        }).catch((error) => {
          setMessage({
          message: `'${newName}' was already deleted from server`,
          type: 'error'
          })
          setPersons(persons.filter((n) => n.name === newName))
        })
      }else{
        return
      }
    }else{
      personService.create(personObject).then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
      setMessage({
          message: `Added ${newName}`,
          type: 'success'
          })
      }).catch((error) => {
        setMessage({
          message: error.message,
          type: 'error'
        })
        setNewName("");
        setNewNumber("");
      });
    }
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
      <Notification notif={message}/>
      <Filter value={filterName} onChange={handleFilterChange} />

      <h3>Add a new</h3>
      <PersonForm onSubmit={addName} valueName={newName} onChangeName={handleNameChange} valueNumber={newNumber} onChangeNumber={handleNumberChange} />

      <h3>Numbers</h3>
      <Persons filter={filterToShow} erase={deletePerson}/>
    </div>
  )
}

export default App