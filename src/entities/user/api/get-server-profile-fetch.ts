import { axiosMain } from '@/shared/api/axios'
import axios from 'axios'
import { cookies } from 'next/headers'

export const getServerProfileFetch = async () => {
	try {
		const cookieStore = await cookies()
		const token = cookieStore.get('access_token')?.value

		if (!token) return { isSuccess: false, data: 'No token' }

		const res = await axiosMain.get('/users/profile', {
			headers: {
				Cookie: `access_token=${token}`
			}
		})

		return {
			isSuccess: true,
			data: res.data
		}
	} catch (e) {
		console.log(e)

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
