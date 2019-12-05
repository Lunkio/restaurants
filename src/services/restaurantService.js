import axios from 'axios'

const baseUrl = '/api/restaurant'
// const jsonServer = 'http://localhost:3001/data'

let token = null
const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const add = async (restaurant) => {
    const config = {
        headers: { Authorization: token }
    }
    const response = await axios.post(`${baseUrl}`, restaurant, config)
    return response
}

const modify = async (meat, restaurantId) => {
    const config = {
        headers: { Authorization: token }
    }
    const response = await axios.put(`${baseUrl}/${restaurantId}`, meat, config)
    return response
}

const remove = async (id) => {
    const config = {
        headers: { Authorization: token }
    }
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response
}

export default { getAll, add, modify, remove, setToken }