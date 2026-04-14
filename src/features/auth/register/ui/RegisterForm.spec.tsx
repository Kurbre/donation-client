import { render } from '@/shared/utils/tests'
import RegisterForm from './RegisterForm'

describe('Register form', () => {
	afterEach(() => {
		jest.clearAllMocks()
	})

	test('Success register', () => {
		render(<RegisterForm />)
	})
})
