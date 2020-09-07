import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    const req = axios.get(baseUrl)
    return req.then(response => response)
}

const create = (newObject) => {
    const req = axios.post(baseUrl, newObject)
    req.then(r => console.log(r))
    //TODO: MUUTETTU
    return req.then(response => response)
}

const update = (id, newObject) => {
    const req = axios.put(`${baseUrl}/${id}`, newObject)
    return req.then(response => response)
}

const remove = (id) => {
    const req = axios.delete(`${baseUrl}/${id}`)
    return req.then(response => response)
}

export default { getAll, create, update, remove }