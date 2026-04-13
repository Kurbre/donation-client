import { axiosMain } from '@/shared/api/axios'
import axios from 'axios'

export const resetPasswordTokenFetch = async (
	token: string
): Promise<Boolean> => {
	try {
		const res = await axiosMain.get<boolean>(
			`/users/reset-password-token/${token}`
		)

		return res.data
	} catch (e) {
		if (axios.isAxiosError(e)) {
			const message = e.response?.data?.message ?? 'Ошибка поиска токена'
			throw new Error(message)
		}

		throw new Error('Unexpected error')
	}
}
