import { axiosMain } from '@/shared/api/axios'
import { RegisterData, RegisterResponse } from '../model/types'
import axios from 'axios'

export const registerFetch = async (data: RegisterData) => {
	try {
		const res = await axiosMain.post<RegisterResponse>('/auth/register', data)

		return res.data
	} catch (e) {
		if (axios.isAxiosError(e)) {
			const message = e.response?.data?.message ?? 'Ошибка авторизации'
			throw new Error(message)
		}

		throw new Error('Unexpected error')
	}
}
