import { render } from '@/shared/utils/tests'
import UploadMedia from './UploadMedia'
import { screen, waitFor } from '@testing-library/dom'
import * as api from '../api/upload-media'
import { toast } from 'react-toastify'
import userEvent from '@testing-library/user-event'
import * as formatMediaLabel from '../model/formatMediaLabel'

describe('Upload media', () => {
	const mockSetSrc = jest.fn()

	afterEach(() => {
		jest.clearAllMocks()
	})

	test('should be success upload', async () => {
		const mockUrl = 'https://test.com/image.png'
		jest.spyOn(api, 'uploadMedia').mockResolvedValue({
			asset_id: 'string',
			public_id: 'string',
			version: 1,
			version_id: 'string',
			signature: 'string',
			width: 1,
			height: 2,
			format: 'string',
			resource_type: 'string',
			created_at: 'string',
			tags: [],
			bytes: 2,
			type: 'string',
			etag: 'string',
			placeholder: true,
			url: mockUrl,
			secure_url: mockUrl,
			asset_folder: 'string',
			display_name: 'string',
			original_filename: 'string'
		})
		jest
			.spyOn(formatMediaLabel, 'formatMediaLabel')
			.mockReturnValueOnce('image')

		render(<UploadMedia setFileSrc={mockSetSrc} />)

		const btn = await screen.findByText(/загрузить файл/i)
		expect(btn).toBeInTheDocument()

		const file = new File(['hello'], 'test.png', { type: 'image/png' })

		const input = await screen.findByTestId('upload-file-input')
		expect(input).toBeInTheDocument()

		await userEvent.upload(input, file)

		await waitFor(() => {
			expect(api.uploadMedia).toHaveBeenCalledWith(file)
			expect(api.uploadMedia).toHaveBeenCalledTimes(1)
			expect(mockSetSrc).toHaveBeenCalledWith(mockUrl)
			expect(mockSetSrc).toHaveBeenCalledTimes(1)
			expect(formatMediaLabel.formatMediaLabel).toHaveBeenCalledTimes(1)
			expect(toast.success).toHaveBeenCalled()
		})
	})

	test('should be failed upload', async () => {
		jest.spyOn(api, 'uploadMedia').mockRejectedValue(new Error())

		render(<UploadMedia setFileSrc={mockSetSrc} />)

		const btn = await screen.findByText(/загрузить файл/i)
		expect(btn).toBeInTheDocument()

		const file = new File(['hello'], 'test.png', { type: 'image/png' })

		const input = await screen.findByTestId('upload-file-input')
		expect(input).toBeInTheDocument()

		await userEvent.upload(input, file)

		await waitFor(() => {
			expect(api.uploadMedia).toHaveBeenCalledWith(file)
			expect(api.uploadMedia).rejects.toThrow(Error)
			expect(toast.error).toHaveBeenCalled()
		})
	})
})
