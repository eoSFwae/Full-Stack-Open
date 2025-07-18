import axios from "axios"

const baseUrl = "http://localhost:3001/api/persons"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (newPerson)=> {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
        .catch(error => {
            throw error
        })
}

const updatePhone = (id, updatedPhone)=> {
    const request = axios.put(`${baseUrl}/${id}`,updatedPhone)
    return request.then(response => response.data)
        .catch((error)=>{
            throw(error)
        })
}

// const update = (id, updatedPerson)=> {
//     const request = axios.put(`${baseUrl}/${id}`,updatedPerson)
//     return request.then(response => response.data)
//         .catch((error)=>{
//             throw(error)
//         })
// }

export default {
    getAll,
    create,
    deletePerson,
    updatePhone
}

