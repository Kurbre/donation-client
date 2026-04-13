import { axiosMain } from '@/shared/api/axios'
import axios from 'axios'
import { ResetPasswordResponse } from '../model/types'

export const resetPasswordFetch = async (
	token: string,
	password: string
): Promise<ResetPasswordResponse> => {
	try {
		const res = await axiosMain.post<ResetPasswordResponse>(
			'/users/reset-password',
			{
				token,
				password
			}
		)

		return res.data
	} catch (e) {
		if (axios.isAxiosError(e)) {
			const message = e.response?.data?.message ?? 'Ошибка сброса пароля'
			throw new Error(message)
		}

		throw new Error('Unexpected error')
	}
}
