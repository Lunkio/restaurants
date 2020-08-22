import axios from 'axios'

const baseUrl = '/login'

const login = async (credentials) => {
    //console.log(credentials)
    const result = await axios.post(`${baseUrl}`, credentials)
    return result.data
}

export default { login }