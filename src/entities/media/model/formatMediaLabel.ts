export const formatMediaLabel = (fileType: string): string => {
	const type = fileType.split('/')[0]

	if (type === 'image') return 'фото'
	if (type === 'video') return 'видео'

	return 'файл'
}
