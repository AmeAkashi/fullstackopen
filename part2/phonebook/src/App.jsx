import { useState, useEffect } from 'react'
import phonebook from './services/phonebook'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [namesToShow, setNamesToShow] = useState(persons)

    useEffect(() => {
        phonebook
            .getAll()
            .then(initialList => {
                setPersons(initialList)
                setNamesToShow(initialList)
            })
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()

        if (newName.trim() === '' || newNumber.trim() === '') {
            alert('Both the name and the number fields must be filled')
            return
        }

        if (persons.some(person => person.name === newName)) {
            alert(`${newName} is already added to phonebook`)
            return
        }

        const newPerson = {
            name: newName,
            number: newNumber,
        }

        phonebook
            .create(newPerson)
            .then(returnedData => {
                const newContactList = persons.concat(returnedData)
                setPersons(newContactList)
                setNamesToShow(newContactList)
                setNewName('')
                setNewNumber('')
            })
    }

    const handleChangeName = (event) => {
        setNewName(event.target.value)
    }

    const handleChangeNumber = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        const searchPattern = new RegExp(event.target.value.toLowerCase())
        setNamesToShow(persons.filter(person => searchPattern.test(person.name.toLowerCase())))
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter onChange={handleFilterChange} />
            <h3>Add new contact</h3>
            <PersonForm 
                onSubmit={handleSubmit}
                name={newName}
                nameChange={handleChangeName}
                number={newNumber}
                numberChange={handleChangeNumber}
            />
            <h3>Numbers</h3>
            <Persons data={namesToShow} />
        </div>
    )
}

export default App
