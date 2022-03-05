import axios from 'axios'

const URL = process.env.NEXT_PUBLIC_URL
const API_KEY = process.env.NEXT_PUBLIC_API_KEY

export const api = axios.create({
    baseURL: URL
})

export const apiFetcher = async (url, page = '') => {
    const { data } = await api.get(url + API_KEY + page)
    return data
}

