import { axiosMain } from '@/shared/api/axios'
import axios from 'axios'
import { headers } from 'next/headers'

export const getServerProfileFetch = async () => {
	try {
		const headersStore = await headers()
		const res = await axiosMain.get('/users/profile', {
			headers: { Cookie: headersStore.get('cookie') ?? '' }
		})

		return {
			isSuccess: true,
			data: res.data
		}
	} catch (e) {
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
	}
}
