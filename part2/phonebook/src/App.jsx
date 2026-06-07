import { useState, useEffect } from 'react'
import phonebook from './services/phonebook'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [namesToShow, setNamesToShow] = useState(persons)
    const [message, setMessage] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null)

    useEffect(() => {
        phonebook
            .getAll()
            .then(initialList => {
                setPersons(initialList)
                setNamesToShow(initialList)
            })
            .catch(error => {
                setErrorMsg(error.message)
            })
    }, [])

    const updateNumber = (contact) => {
        const changedContact = { ...contact, number: newNumber }
        phonebook
            .update(contact.id, changedContact)
            .then(returnedData => {
                const changedList = persons.map(person =>
                    person.id === contact.id ? returnedData : person
                )
                setPersons(changedList)
                setNamesToShow(changedList)
                setNewName('')
                setNewNumber('')
                setMessage(`Updated ${contact.name}`)

                setTimeout(() => {
                    setMessage(null)
                }, 5000)
            })
            .catch(error => {
                setErrorMsg(`Inforomation of ${contact.name} was already removed from the server: ${error.message}`)

                setTimeout(() => {
                    setErrorMsg(null)
                }, 5000)

                const changedList = persons.filter(person => person.id !== contact.id)
                setPersons(changedList)
                setNamesToShow(changedList)
            })
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if (newName.trim() === '' || newNumber.trim() === '') {
            alert('Both the name and the number fields must be filled')
            return
        }

        const contact = persons.find(person => person.name === newName)

        if (contact !== undefined) {
            if (window.confirm(`${newName} is already added to phonebook, replace old number with the new one?`)) {
                updateNumber(contact)
            }
            return
        }

        const newPerson = {
            name: newName,
            number: newNumber,
        }

        phonebook
            .create(newPerson)
            .then(returnedData => {
                const changedList = persons.concat(returnedData)
                setPersons(changedList)
                setNamesToShow(changedList)
                setMessage(`Added ${newName}`)

                setTimeout(() => {
                    setMessage(null)
                }, 5000)

                setNewName('')
                setNewNumber('')
            })
            .catch(error => {
                setErrorMsg(error.message)

                setTimeout(() => {
                    setErrorMsg(null)
                }, 5000)
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

    const deleteById = (id, name) => {
        phonebook
            .remove(id)
            .then(() => {
                const changedList = persons.filter(person => person.id !== id)
                setPersons(changedList)
                setNamesToShow(changedList)
                setMessage(`Removed ${name}`)

                setTimeout(() => {
                    setMessage(null)
                }, 5000)
            })
            .catch(error => {
                setErrorMsg(error.message)

                setTimeout(() => {
                    setErrorMsg(null)
                }, 5000)

                const changedList = persons.filter(person => person.id !== id)
                setPersons(changedList)
                setNamesToShow(changedList)
            })
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={message} error={errorMsg} />
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
            <Persons data={namesToShow} handleDelete={deleteById}/>
        </div>
    )
}

export default App
