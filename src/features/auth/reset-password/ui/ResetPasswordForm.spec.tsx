import { render } from '@/shared/utils/tests'
import ResetPasswordForm from './ResetPasswordForm'
import * as api from '../api/send-reset-password-fetch'
import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { ROUTES } from '@/shared/utils/routes'
import { toast } from 'react-toastify'

describe('Reset password form', () => {
	afterEach(() => {
		jest.clearAllMocks()
	})

	test('should be send reset password mail if valid data', async () => {
		jest.spyOn(api, 'sendResetPasswordFetch').mockResolvedValue({
			message: ''
		})

		render(<ResetPasswordForm />)

		const emailInput = await screen.findByPlaceholderText(/email/i)

		expect(emailInput).toBeInTheDocument()
		await userEvent.type(emailInput, 'test@gmail.com')

		const submitButton = await screen.findByRole('button', {
			name: /запрос/i
		})

		expect(submitButton).toBeInTheDocument()
		await userEvent.click(submitButton)

		expect(api.sendResetPasswordFetch).toHaveBeenCalledWith({
			email: 'test@gmail.com'
		})
		expect(api.sendResetPasswordFetch).toHaveBeenCalledTimes(1)

		const successSection = await screen.findByTestId('success-section')
		expect(successSection).toBeInTheDocument()

		const mainLink = await screen.findByRole('link', {
			name: /главную/i
		})
		expect(mainLink).toHaveAttribute('href', '/')
	})

	test('should be send reset password mail if not valid data', async () => {
		jest.spyOn(api, 'sendResetPasswordFetch').mockResolvedValue({
			message: ''
		})

		render(<ResetPasswordForm />)

		const emailInput = await screen.findByPlaceholderText(/email/i)

		expect(emailInput).toBeInTheDocument()
		await userEvent.type(emailInput, '123')

		const submitButton = await screen.findByRole('button', {
			name: /запрос/i
		})

		expect(submitButton).toBeInTheDocument()
		await userEvent.click(submitButton)

		expect(api.sendResetPasswordFetch).not.toHaveBeenCalled()

		const successSection = screen.queryByTestId('success-section')
		expect(successSection).not.toBeInTheDocument()

		const findEmailError = await screen.findByText(/не валидный/i)
		expect(findEmailError).toBeInTheDocument()
	})

	test('should be send reset password mail if request failed', async () => {
		jest.spyOn(api, 'sendResetPasswordFetch').mockRejectedValue(new Error())

		render(<ResetPasswordForm />)

		const emailInput = await screen.findByPlaceholderText(/email/i)

		expect(emailInput).toBeInTheDocument()
		await userEvent.type(emailInput, 'test@gmail.com')

		const submitButton = await screen.findByRole('button', {
			name: /запрос/i
		})

		expect(submitButton).toBeInTheDocument()
		await userEvent.click(submitButton)

		expect(api.sendResetPasswordFetch).toHaveBeenCalledWith({
			email: 'test@gmail.com'
		})
		expect(api.sendResetPasswordFetch).toHaveBeenCalledTimes(1)

		const successSection = screen.queryByTestId('success-section')
		expect(successSection).not.toBeInTheDocument()

		await waitFor(() => {
			expect(toast.error).toHaveBeenCalledTimes(1)
		})
	})

	test('should be links', async () => {
		render(<ResetPasswordForm />)

		const loginLink = await screen.findByRole('link', {
			name: /войти/i
		})
		const registerLink = await screen.findByRole('link', {
			name: /зарегистрироваться/i
		})
		expect(loginLink).toHaveAttribute('href', ROUTES.login)
		expect(registerLink).toHaveAttribute('href', ROUTES.register)
	})
})
