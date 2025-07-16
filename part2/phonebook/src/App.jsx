import {useState, useEffect} from 'react'
import phonebook from "./services/phonebook";

const successResponse = {
    color: "green",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px"
}

const Display = ({persons, deletePerson}) => {
    return (persons.map((person) => (
        <div key={person.id}>
            <p>{person.name} {person.number}
                <button onClick={() => deletePerson(person.id)} type="button">delete</button>
            </p>
        </div>
    )))
}

const PersonForm = ({addPerson, newName, setNewName, newNumber, setNumber}) => {
    return (
        <form onSubmit={addPerson}>
            <div>
                name: <input value={newName} onChange={e => {
                setNewName(e.target.value)
            }}></input>
                {/*<div>debug: {newName}</div>*/}
            </div>
            <div>
                number: <input value={newNumber} onChange={e => {
                setNumber(e.target.value)
            }}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

const Notification = ({message, style})=> {
    if (message === null) {
        return null
    }

    return (
        <div style={style} className='success'>
            {message}
        </div>
    )
}

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNumber] = useState('')
    const [successMessage, setSuccessMessage] = useState(null)

    const hook = () => {
        phonebook.getAll().then(response => {
            setPersons(response)
        })
    }
    useEffect(hook, []);


    const addPerson = (event) => {
        event.preventDefault()
        const existingPerson = persons.find(person => person.name === newName)
        if (existingPerson) {
            if(!window.confirm(`${newName} is already added to numberbook do you want to update a new phone number?`)){
                return
        }
            phonebook.updatePhone(existingPerson.id, {...existingPerson, number: newNumber})
                .then(updatedPerson => {
                    setPersons(persons.map(person => person.id === updatedPerson.id ? updatedPerson : person))
                    setSuccessMessage(`${newName} is now updated to a new phone number`)
                    setTimeout(() => {setSuccessMessage(null)},5000)
                })

        }
        else {
            const newPerson = {name: newName, number: newNumber}
            phonebook.create(newPerson)
                .then((response) => {
                    setPersons([...persons, response])
                    setSuccessMessage(`${newName} has been added`)
                    setTimeout(() => {setSuccessMessage(null)},5000)
                })
        }
    }
    const deletePerson = (id) => {
        if (window.confirm('Are you sure you want to delete this person?')) {
            phonebook.deletePerson(id).then(deletedPerson => setPersons(persons.filter(person => person.id !== deletedPerson.id)))
                .catch((error) => alert(error))
        }
    }

    return (
        <div>
            <h2>Numberbook</h2>
            <Notification style={successResponse} message={successMessage} />
            <PersonForm addPerson={addPerson} newName={newName} setNewName={setNewName} newNumber={newNumber}
                        setNumber={setNumber}/>
            <h2>Numbers</h2>
            <Display persons={persons} deletePerson={deletePerson}/>
        </div>
    )
}

export default App