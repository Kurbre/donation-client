import { axiosMain } from '@/shared/api/axios'
import axios from 'axios'
import { LoginData, LoginResponse } from '../model/types'

export const loginFetch = async (data: LoginData) => {
	try {
		const res = await axiosMain.post<LoginResponse>('/auth/login', data)

		return res.data
	} catch (e) {
		if (axios.isAxiosError(e)) {
			const message = e.response?.data?.message ?? 'Ошибка авторизации'
			throw new Error(message)
		}

		throw new Error('Unexpected error')
	}
}
