import { axiosMain } from '@/shared/api/axios'
import axios from 'axios'
import { cookies } from 'next/headers'

export const getServerProfileFetch = async () => {
	try {
		const cookieStore = await cookies()
		const res = await axiosMain.get('/users/profile', {
			headers: {
				cookie: cookieStore.toString()
			}
		})

		console.log(res.headers)

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
