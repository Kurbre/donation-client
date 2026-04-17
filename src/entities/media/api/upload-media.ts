import axios from 'axios'
import { MediaResponse } from '../model/types'

export const uploadMedia = async (file: File) => {
	try {
		const url = process.env.NEXT_PUBLIC_MEDIA_URL
		if (!url) throw new Error('Media url не передан в .env')

		const formData = new FormData()
		formData.append('file', file)
		formData.append('upload_preset', 'client')

		const res = await axios.post<MediaResponse>(url, formData)

		return res.data
	} catch (error) {
		console.log(error)
		throw new Error('Ошибка загрузки медиа')
	}
}
