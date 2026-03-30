import { axiosMain } from '@/shared/api/axios'
import axios from 'axios'
import { ResetPasswordData, ResetPasswordResponse } from '../model/types'

export const sendResetPasswordFetch = async (data: ResetPasswordData) => {
	try {
		const res = await axiosMain.post<ResetPasswordResponse>(
			'/users/send-reset-password',
			data
		)

		return res.data
	} catch (e) {
		if (axios.isAxiosError(e)) {
			const message =
				e.response?.data?.message ?? 'Ошибка отправки письма о смене пароля'
			throw new Error(message)
		}

		throw new Error('Unexpected error')
	}
}
