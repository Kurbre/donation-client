import { axiosMain } from '@/shared/api/axios'
import axios from 'axios'
import { ConfirmRegisterFetchResponse } from '../model/types'

export const confirmRegisterFetch = async (
	token: string
): Promise<ConfirmRegisterFetchResponse> => {
	try {
		const res = await axiosMain.post<ConfirmRegisterFetchResponse>(
			'/auth/confirmed-register',
			{},
			{
				params: {
					token
				}
			}
		)

		return res.data
	} catch (e) {
		if (axios.isAxiosError(e)) {
			const message =
				e.response?.data?.message ?? 'Ошибка подстверждения регистрации'
			throw new Error(message)
		}

		throw new Error('Unexpected error')
	}
}
