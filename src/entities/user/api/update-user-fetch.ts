import { axiosMain } from '@/shared/api/axios'
import axios from 'axios'
import { User } from '../model/types'
import { type UpdateUser } from '@/features/update-profile/model/types'

export const updateUserFetch = async (data: UpdateUser) => {
	try {
		const res = await axiosMain.patch<User>('/users', data)

		return res.data
	} catch (e) {
		if (axios.isAxiosError(e)) {
			const message = e.response?.data?.message ?? 'Ошибка обновления аккаунта'
			throw new Error(message)
		}

		throw new Error('Unexpected error')
	}
}
