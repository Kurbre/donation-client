import { axiosMain } from '@/shared/api/axios'
import axios from 'axios'
import { User } from '../model/types'

export const getProfileFetch = async () => {
	try {
		const res = await axiosMain.get<User>('/users/profile')

		return res.data
	} catch (e) {
		if (axios.isAxiosError(e)) {
			const message = e.response?.data?.message ?? 'Ошибка авторизации'
			throw new Error(message)
		}

		throw new Error('Unexpected error')
	}
}
