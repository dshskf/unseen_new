import axios from 'axios'
import { API } from './link'

export const Get = async (route, header = null) => {
    const URL = API + route
    if (header) {
        return await axios.get(URL, header)
    }
    return await axios.get(URL)
}

export const Post = async (route, data, header = null) => {
    const URL = API + route
    if (header) {
        return await axios.post(URL, data, header)
    }
    return await axios.post(URL, data)
}

export const storage = JSON.parse(localStorage.getItem('login_data'))