import axios from 'axios'

const isServer = typeof window === 'undefined'

export const axiosMain = axios.create({
	baseURL: isServer ? process.env.NEXT_PUBLIC_API_URL : '/api',
	withCredentials: true
})
