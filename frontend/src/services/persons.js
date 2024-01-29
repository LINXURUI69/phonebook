import axios from 'axios'

// const baseUrl = 'http://localhost:8080/persons'
const baseUrl = 'http://server-service:8080/persons'

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const create = newObject => {
    return axios.post(baseUrl, newObject).then(response => response.data)
}

const erase = id => {
    return axios.delete(`${baseUrl}/${id}`).then(response => response.data)
}

export default { getAll, create, erase }