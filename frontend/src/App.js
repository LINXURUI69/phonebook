import { useEffect, useState } from 'react'
import personService from './services/persons'

const Filter = ({ nameFilter, handleNameFilterChange }) => {
  return (
    <div>filter shown with <input value={nameFilter} onChange={handleNameFilterChange} /></div>
  )
}

const PersonForm = ({ handlePersonSubmit, newName, newNumber, handleNameChange, handleNumberChange }) => {
  return (
    <form onSubmit={handlePersonSubmit}>
      <div>name: <input value={newName} onChange={handleNameChange} /></div>
      <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

const Persons = ({ filteredPersons, handlePersonDelete }) => {
  return (
    <div>
      {filteredPersons.map(filteredPerson =>
        <div key={filteredPerson.name}>
          {filteredPerson.name} {filteredPerson.number}
          <button onClick={() => handlePersonDelete(filteredPerson._id)}>delete</button>
        </div>
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const [nameFilter, setNameFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(nameFilter.toLowerCase()))

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value)
  }

  const handlePersonSubmit = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
    }
    personService.create(newPerson).then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
    })

    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handlePersonDelete = (_id) => {
    const personToDelete = persons.find(person => person._id === _id)
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personService.erase(_id).then(() => {
        setPersons(persons.filter(person => person._id !== _id))
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter nameFilter={nameFilter} handleNameFilterChange={handleNameFilterChange} />
      <h3>Add a new</h3>
      <PersonForm handlePersonSubmit={handlePersonSubmit} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons} handlePersonDelete={handlePersonDelete} />
    </div>
  )
}

export default App