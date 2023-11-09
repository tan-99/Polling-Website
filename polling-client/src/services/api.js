import axios from "axios"

const host = 'http://localhost:4000/api'

export const setToken = token => {
    if(token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
        delete axios.defaults.headers.common['Authorization']
    }
}

export const call = async(method, path, data) => {
    const response = await axios[method](`${host}/${path}`, data)
    console.log(response)
    return response.data
}

const api = { setToken, call };

export default api;