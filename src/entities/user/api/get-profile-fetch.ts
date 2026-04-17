import { axiosMain } from '@/shared/api/axios'
import axios from 'axios'
import { cookies } from 'next/headers'

export const getProfileFetch = async (isSSR: boolean = false) => {
	try {
		const res = await axiosMain.get('/users/profile')

		return res.data
	} catch (e) {
		if (axios.isAxiosError(e)) {
			const message = e.response?.data?.message ?? 'Ошибка авторизации'
			throw new Error(message)
		}

		throw new Error('Unexpected error')
	}
}
