import { formatMediaLabel } from './formatMediaLabel'

describe('Format media label', () => {
	test('should be return image type', () => {
		const result = formatMediaLabel('image/png')

		expect(result).toBe('фото')
	})

	test('should be return video type', () => {
		const result = formatMediaLabel('video/png')

		expect(result).toBe('видео')
	})

	test('should be return other type', () => {
		const result = formatMediaLabel('application/pdf')

		expect(result).toBe('файл')
	})
})
