import { useState , useEffect} from 'react'
import axios from "axios"


const Display = ({persons})=>{
    return(persons.map((person)=>(<p>{person.name} {person.number}</p>)))
}

const PersonForm = ({addPerson, newName, setNewName, newNumber, setNumber}) => {
    return(
        <form onSubmit={addPerson}>
            <div>
                name: <input value={newName} onChange={e => {
                setNewName(e.target.value)}}></input>
                {/*<div>debug: {newName}</div>*/}
            </div>
            <div>
                number: <input value={newNumber} onChange={e => {setNumber(e.target.value)}}/>
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
    const [newNumber, setNumber] = useState('')

    const hook = ()=>{
        axios
            .get("http://localhost:3001/persons")
            .then(res=>{
                setPersons(res.data)
            })
    }
    useEffect(hook, []);



    const addPerson = (event) => {
        event.preventDefault()
        if (persons.find(person => person.name === newName)) {
            (alert(`${newName} is already added to numberbook`))
            return
        }

         // setPersons(prev => [...prev, {name:newName, number:newNumber}])
        const newPerson = {name:newName, number:newNumber}
        axios
            .post("http://localhost:3001/persons",newPerson)
            .then(res=>{setPersons([...persons ,res.data])
                setNewName('')
                setNumber("")})

    }

    return (
        <div>
            <h2>Numberbook</h2>
            <PersonForm  addPerson={addPerson} newName={newName} setNewName={setNewName} newNumber={newNumber} setNumber={setNumber} />
            <h2>Numbers</h2>
            <Display persons={persons}/>
        </div>
    )
}

export default App