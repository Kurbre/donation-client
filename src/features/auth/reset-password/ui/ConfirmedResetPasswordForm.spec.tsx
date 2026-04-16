import { render } from '@/shared/utils/tests'
import * as resetApi from '../api/reset-password-fetch'
import * as tokenApi from '../api/reset-password-token-fetch'
import ConfirmedResetPasswordForm from './ConfirmedResetPasswordForm'
import {
	mockGet,
	mockPush,
	mockRefresh
} from '@/shared/utils/tests/model/setupTests'
import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { ROUTES } from '@/shared/utils/routes'
import { toast } from 'react-toastify'

describe('Confirmed reset password form', () => {
	afterEach(() => {
		jest.clearAllMocks()
	})

	test('should be reset password if valid data', async () => {
		jest.spyOn(resetApi, 'resetPasswordFetch').mockResolvedValue({
			message: ''
		})
		jest.spyOn(tokenApi, 'resetPasswordTokenFetch').mockResolvedValue(true)

		render(<ConfirmedResetPasswordForm />)

		expect(mockGet).toHaveBeenCalled()
		expect(tokenApi.resetPasswordTokenFetch).toHaveBeenCalledWith(
			'test-token-123'
		)
		expect(tokenApi.resetPasswordTokenFetch).toHaveBeenCalledTimes(1)

		const passwordInput = await screen.findByPlaceholderText(/введите/i)
		const repeatPasswordInput = await screen.findByPlaceholderText(/повторите/i)

		expect(passwordInput).toBeInTheDocument()
		expect(repeatPasswordInput).toBeInTheDocument()

		await userEvent.type(passwordInput, 'qwerty')
		await userEvent.type(repeatPasswordInput, 'qwerty')

		const submitButton = await screen.findByRole('button', {
			name: /сбросить пароль/i
		})

		expect(submitButton).toBeInTheDocument()
		await userEvent.click(submitButton)

		await waitFor(async () => {
			expect(resetApi.resetPasswordFetch).toHaveBeenCalledWith(
				'test-token-123',
				'qwerty'
			)
			expect(resetApi.resetPasswordFetch).toHaveBeenCalledTimes(1)

			expect(mockRefresh).toHaveBeenCalledTimes(1)

			const successSection = await screen.findByTestId('success-section')
			expect(successSection).toBeInTheDocument()

			const loginLink = await screen.findByRole('link', {
				name: /авторизоваться/i
			})
			expect(loginLink).toBeInTheDocument()
			expect(loginLink).toHaveAttribute('href', ROUTES.login)
		})
	})

	test('should be reset password if not valid data', async () => {
		jest.spyOn(resetApi, 'resetPasswordFetch').mockResolvedValue({
			message: ''
		})
		jest.spyOn(tokenApi, 'resetPasswordTokenFetch').mockResolvedValue(true)

		render(<ConfirmedResetPasswordForm />)

		expect(mockGet).toHaveBeenCalled()
		expect(tokenApi.resetPasswordTokenFetch).toHaveBeenCalledWith(
			'test-token-123'
		)
		expect(tokenApi.resetPasswordTokenFetch).toHaveBeenCalledTimes(1)

		const passwordInput = await screen.findByPlaceholderText(/введите/i)
		const repeatPasswordInput = await screen.findByPlaceholderText(/повторите/i)

		expect(passwordInput).toBeInTheDocument()
		expect(repeatPasswordInput).toBeInTheDocument()

		await userEvent.type(passwordInput, '12')
		await userEvent.type(repeatPasswordInput, '12')

		const submitButton = await screen.findByRole('button', {
			name: /сбросить пароль/i
		})

		expect(submitButton).toBeInTheDocument()
		await userEvent.click(submitButton)

		expect(resetApi.resetPasswordFetch).not.toHaveBeenCalled()

		const minLengthErrors = await screen.findAllByText(/минимальная/i)
		expect(minLengthErrors).toHaveLength(2)

		await userEvent.type(passwordInput, 'a'.repeat(256))
		await userEvent.type(repeatPasswordInput, 'a'.repeat(256))

		const maxLengthErrors = await screen.findAllByText(/максимальная/i)
		expect(maxLengthErrors).toHaveLength(2)
	})

	test('should be reset password if not token', async () => {
		mockGet.mockReturnValueOnce(null)

		render(<ConfirmedResetPasswordForm />)

		expect(mockGet).toHaveBeenCalled()
		expect(mockPush).toHaveBeenCalledWith('/')
		expect(mockPush).toHaveBeenCalledTimes(1)
	})

	test('should be reset password if failed token request', async () => {
		jest
			.spyOn(tokenApi, 'resetPasswordTokenFetch')
			.mockRejectedValue(new Error())

		render(<ConfirmedResetPasswordForm />)

		expect(mockGet).toHaveBeenCalled()

		expect(tokenApi.resetPasswordTokenFetch).toHaveBeenCalledTimes(1)
		expect(tokenApi.resetPasswordTokenFetch).rejects.toThrow(Error)

		await waitFor(() => {
			expect(mockPush).toHaveBeenCalledWith('/')
			expect(mockPush).toHaveBeenCalledTimes(1)
		})
	})

	test('should be reset password if failed request', async () => {
		jest.spyOn(resetApi, 'resetPasswordFetch').mockRejectedValue(new Error())
		jest.spyOn(tokenApi, 'resetPasswordTokenFetch').mockResolvedValue(true)

		render(<ConfirmedResetPasswordForm />)

		expect(mockGet).toHaveBeenCalled()
		expect(tokenApi.resetPasswordTokenFetch).toHaveBeenCalledWith(
			'test-token-123'
		)
		expect(tokenApi.resetPasswordTokenFetch).toHaveBeenCalledTimes(1)

		const passwordInput = await screen.findByPlaceholderText(/введите/i)
		const repeatPasswordInput = await screen.findByPlaceholderText(/повторите/i)

		expect(passwordInput).toBeInTheDocument()
		expect(repeatPasswordInput).toBeInTheDocument()

		await userEvent.type(passwordInput, 'qwerty')
		await userEvent.type(repeatPasswordInput, 'qwerty')

		const submitButton = await screen.findByRole('button', {
			name: /сбросить пароль/i
		})

		expect(submitButton).toBeInTheDocument()
		await userEvent.click(submitButton)

		await waitFor(async () => {
			expect(resetApi.resetPasswordFetch).toHaveBeenCalledWith(
				'test-token-123',
				'qwerty'
			)
			expect(resetApi.resetPasswordFetch).toHaveBeenCalledTimes(1)
			expect(resetApi.resetPasswordFetch).rejects.toThrow(Error)

			const successSection = screen.queryByTestId('success-section')
			expect(successSection).not.toBeInTheDocument()

			expect(toast.error).toHaveBeenCalled()

			expect(mockPush).toHaveBeenCalledWith('/')
			expect(mockPush).toHaveBeenCalledTimes(1)
		})
	})
})
