import axios from 'axios'

const baseUrl = '/api/restaurant'
// const jsonServer = 'http://localhost:3001/data'

let token = null
const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = async () => {
    const result = await axios.get(baseUrl)
    return result.data
}

const add = async (restaurant) => {
    const config = {
        headers: { Authorization: token }
    }
    const result = await axios.post(`${baseUrl}`, restaurant, config)
    return result
}

const modify = async (meat, restaurantId) => {
    const config = {
        headers: { Authorization: token }
    }
    const result = await axios.put(`${baseUrl}/${restaurantId}`, meat, config)
    return result
}

const remove = async (id) => {
    const config = {
        headers: { Authorization: token }
    }
    const result = await axios.delete(`${baseUrl}/${id}`, config)
    return result
}

export default { getAll, add, modify, remove, setToken }