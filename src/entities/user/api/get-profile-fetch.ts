import { axiosMain } from '@/shared/api/axios'
import axios from 'axios'
import { cookies } from 'next/headers'

export const getProfileFetch = async (isSSR: boolean = false) => {
	try {
		if (isSSR) {
			const cookieHeader = await cookies()
			const res = await axiosMain.get('/users/profile', {
				headers: { Cookie: cookieHeader.toString() }
			})

			return {
				isSuccess: true,
				data: res.data
			}
		}

		const res = await axiosMain.get('/users/profile')

		return res.data
	} catch (e) {
		if (isSSR) {
			if (axios.isAxiosError(e)) {
				const message = e.response?.data?.message ?? 'Ошибка авторизации'

				return {
					isSuccess: false,
					data: message
				}
			}

			return {
				isSuccess: false,
				data: 'Unexpected error'
			}
		} else {
			if (axios.isAxiosError(e)) {
				const message = e.response?.data?.message ?? 'Ошибка авторизации'
				throw new Error(message)
			}

			throw new Error('Unexpected error')
		}
	}
}
