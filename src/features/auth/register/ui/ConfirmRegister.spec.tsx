import { render } from '@/shared/utils/tests'
import ConfirmRegister from './ConfirmRegister'
import { mockGet, mockPush } from '@/shared/utils/tests/model/setupTests'
import * as api from '../api/confirm-register-fetch'
import { screen, waitFor } from '@testing-library/dom'
import { ROUTES } from '@/shared/utils/routes'

describe('Confirm Register', () => {
	afterEach(() => {
		jest.clearAllMocks()
	})

	test('should confirm register if defined and valid token', async () => {
		jest.spyOn(api, 'confirmRegisterFetch').mockResolvedValue({
			isSuccess: true
		})

		render(<ConfirmRegister />)

		expect(mockGet).toHaveBeenCalled()

		await waitFor(() => {
			expect(api.confirmRegisterFetch).toHaveBeenCalledWith('test-token-123')
			expect(api.confirmRegisterFetch).toHaveBeenCalledTimes(1)
		})
	})

	test('should confirm register if not defined token', async () => {
		jest.spyOn(api, 'confirmRegisterFetch')
		mockGet.mockReturnValueOnce(null)
		render(<ConfirmRegister />)

		expect(mockGet).toHaveBeenCalled()

		await waitFor(() => {
			expect(api.confirmRegisterFetch).toHaveBeenCalledTimes(0)

			expect(mockPush).toHaveBeenCalledWith('/')
			expect(mockPush).toHaveBeenCalledTimes(1)
		})
	})

	test('should confirm register if not valid token', async () => {
		jest.spyOn(api, 'confirmRegisterFetch').mockRejectedValue(new Error())
		render(<ConfirmRegister />)

		expect(mockGet).toHaveBeenCalled()

		await waitFor(() => {
			expect(api.confirmRegisterFetch).toHaveBeenCalledWith('test-token-123')
			expect(api.confirmRegisterFetch).rejects.toThrow(Error)

			expect(mockPush).toHaveBeenCalledWith('/')
		})
	})

	test('should redirect from link profile', async () => {
		jest.spyOn(api, 'confirmRegisterFetch').mockResolvedValue({
			isSuccess: true
		})
		render(<ConfirmRegister />)

		const profileLink = await screen.findByRole('link', {
			name: /перейти/i
		})

		expect(profileLink).toBeInTheDocument()
		expect(profileLink).toHaveAttribute('href', ROUTES.profile)
	})
})
