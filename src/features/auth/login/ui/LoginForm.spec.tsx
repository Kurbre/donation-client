import Providers from '@/app/providers'
import { mockUser } from '@/shared/utils/mocks'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as api from '../api/login-fetch'
import LoginForm from './LoginForm'

const mockPush = jest.fn()
const mockBack = jest.fn()
const mockRefresh = jest.fn()

jest.mock('next/navigation', () => ({
	useRouter: () => ({
		push: mockPush,
		back: mockBack,
		refresh: mockRefresh
	})
}))

describe('Login form', () => {
	beforeEach(() => {
		render(
			<Providers>
				<LoginForm />
			</Providers>
		)
	})

	afterEach(() => {
		jest.clearAllMocks()
	})

	test('Success login and navigation', async () => {
		const mockApi = jest.spyOn(api, 'loginFetch').mockResolvedValue(mockUser)

		const loginButton = screen.getByTestId('login-button')
		const emailInput = screen.getByTestId('email-login-input')
		const passwordInput = screen.getByTestId('password-login-input')

		expect(loginButton).toBeInTheDocument()
		expect(emailInput).toBeInTheDocument()
		expect(passwordInput).toBeInTheDocument()

		await userEvent.type(emailInput, 'test@gmail.com')
		await userEvent.type(passwordInput, '123123')

		await userEvent.click(loginButton)

		await waitFor(() => {
			expect(mockApi).toHaveBeenCalledWith({
				email: 'test@gmail.com',
				password: '123123'
			})
			expect(mockApi).toHaveBeenCalledTimes(1)

			expect(mockPush).toHaveBeenCalledWith('/')
		})
	})

	test('Should show validation errors for empty fields', async () => {
		const mockApi = jest.spyOn(api, 'loginFetch').mockResolvedValue(mockUser)

		const loginButton = screen.getByTestId('login-button')

		expect(loginButton).toBeInTheDocument()

		await userEvent.click(loginButton)

		expect(mockApi).not.toHaveBeenCalled()

		expect(screen.getByText(/не валидный/i)).toBeInTheDocument()
		expect(screen.getByText(/длина пароля/i)).toBeInTheDocument()
	})

	test('Should navigate to reset password page', async () => {
		const resetPasswordLink = screen.getByRole('link', {
			name: /забыли пароль/i
		})

		expect(resetPasswordLink).toBeInTheDocument()

		await userEvent.click(resetPasswordLink)

		expect(resetPasswordLink).toHaveAttribute('href', '/auth/reset-password')
	})

	test('Should navigate to registration page', async () => {
		const registerLink = screen.getByRole('link', {
			name: /зарегистрироваться/i
		})

		expect(registerLink).toBeInTheDocument()

		await userEvent.click(registerLink)

		expect(registerLink).toHaveAttribute('href', '/auth/register')
	})

	test('Should call router.back() if referrer exists', async () => {
		Object.defineProperty(document, 'referrer', {
			value: '/',
			configurable: true
		})

		jest.spyOn(api, 'loginFetch').mockResolvedValue(mockUser)

		await userEvent.type(
			screen.getByTestId('email-login-input'),
			'test@gmail.com'
		)
		await userEvent.type(screen.getByTestId('password-login-input'), '123123')
		await userEvent.click(screen.getByTestId('login-button'))

		await waitFor(() => {
			expect(mockBack).toHaveBeenCalled()
		})
	})
})
