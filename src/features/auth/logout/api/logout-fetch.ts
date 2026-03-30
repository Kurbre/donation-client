import { axiosMain } from '@/shared/api/axios'
import axios from 'axios'
import { LogoutResponse } from '../model/types'

export const logoutFetch = async () => {
	try {
		const res = await axiosMain.post<LogoutResponse>('/auth/logout')

		return res.data
	} catch (e) {
		if (axios.isAxiosError(e)) {
			const message = e.response?.data?.message ?? 'Ошибка авторизации'
			throw new Error(message)
		}

		throw new Error('Unexpected error')
	}
}
