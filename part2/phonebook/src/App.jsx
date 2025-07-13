import { useState } from 'react'

const Display = ({persons})=>{
    return(persons.map((person)=>(<p>{person.name} {person.phone}</p>)))
}

const PersonForm = ({addPerson, newName, setNewName, newPhone, setPhone}) => {
    return(
        <form onSubmit={addPerson}>
            <div>
                name: <input value={newName} onChange={e => {
                setNewName(e.target.value)}}></input>
                {/*<div>debug: {newName}</div>*/}
            </div>
            <div>
                number: <input value={newPhone} onChange={e => {setPhone(e.target.value)}}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ])
    const [newName, setNewName] = useState('')
    const [newPhone, setPhone] = useState('')


    const addPerson = (event) => {
        event.preventDefault()
        if (persons.find(person => person.name === newName)) {
            (alert(`${newName} is already added to phonebook`))
            return
        }
        setPersons(prev => [...prev, {name:newName, phone:newPhone}])
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <PersonForm  addPerson={addPerson} newName={newName} setNewName={setNewName} newPhone={newPhone} setPhone={setPhone} />
            <h2>Numbers</h2>
            <Display persons={persons}/>
        </div>
    )
}

export default App