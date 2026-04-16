import { render } from '@/shared/utils/tests'
import RegisterForm from './RegisterForm'
import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import * as registerApi from '../api/register-fetch'
import { ROUTES } from '@/shared/utils/routes'

describe('Register form', () => {
	afterEach(() => {
		jest.clearAllMocks()
	})

	test('should successfully register with valid data', async () => {
		const registerfetchMock = jest
			.spyOn(registerApi, 'registerFetch')
			.mockResolvedValue({
				message: ''
			})

		render(<RegisterForm />)

		const emailInput = screen.getByTestId('email-input-register')
		const nameInput = screen.getByTestId('name-input-register')
		const surnameInput = screen.getByTestId('surname-input-register')
		const passwordInput = screen.getByTestId('password-input-register')
		const repeatPasswordInput = screen.getByTestId(
			'repeat-password-input-register'
		)

		expect(emailInput).toBeInTheDocument()
		expect(nameInput).toBeInTheDocument()
		expect(surnameInput).toBeInTheDocument()
		expect(passwordInput).toBeInTheDocument()
		expect(repeatPasswordInput).toBeInTheDocument()

		await userEvent.type(emailInput, 'test@gmail.com')
		await userEvent.type(nameInput, 'name')
		await userEvent.type(surnameInput, 'surname')
		await userEvent.type(passwordInput, 'password')
		await userEvent.type(repeatPasswordInput, 'password')
		await userEvent.click(screen.getByText(/зарегистрироваться/i))

		expect(registerfetchMock).toHaveBeenCalledWith({
			email: 'test@gmail.com',
			name: 'name',
			surname: 'surname',
			password: 'password'
		})
		expect(registerfetchMock).toHaveBeenCalledTimes(1)

		expect(screen.getByTestId('success-register')).toBeInTheDocument()

		const mainLink = await screen.findByRole('link', {
			name: /главную/i
		})

		expect(mainLink).toHaveAttribute('href', '/')
	})

	test('should display validation errors for empty fields', async () => {
		const registerfetchMock = jest
			.spyOn(registerApi, 'registerFetch')
			.mockResolvedValue({
				message: ''
			})

		render(<RegisterForm />)

		expect(screen.queryByText(/не валидный/i)).not.toBeInTheDocument()

		await userEvent.click(screen.getByText(/зарегистрироваться/i))

		expect(screen.getByText(/не валидный/i)).toBeInTheDocument()
		expect(screen.getByText(/имени/i)).toBeInTheDocument()
		expect(screen.getByText(/фамилии/i)).toBeInTheDocument()
		expect(screen.getAllByText(/пароля/i)[0]).toBeInTheDocument()
		expect(screen.getAllByText(/пароля/i)[1]).toBeInTheDocument()

		expect(registerfetchMock).not.toHaveBeenCalled()
	})

	test('should redirect auth link', async () => {
		render(<RegisterForm />)

		const authLink = await screen.findByRole('link', {
			name: /войти/i
		})

		expect(authLink).toBeInTheDocument()
		expect(authLink).toHaveAttribute('href', ROUTES.login)
	})
})
