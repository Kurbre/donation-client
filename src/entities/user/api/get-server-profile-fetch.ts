import { axiosMain } from '@/shared/api/axios'
import axios from 'axios'
import { cookies } from 'next/headers'

export const getServerProfileFetch = async () => {
	try {
		const cookieHeader = await cookies()
		const res = await axiosMain.get('/users/profile', {
			headers: { Cookie: cookieHeader.toString() }
		})

		console.log(res.headers, res.data)

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
