import { mockRefresh, render } from '@/shared/utils/tests'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { toast } from 'react-toastify'
import * as api from '../api/logout-fetch'
import LogoutButton from './LogoutButton'

describe('Logout button', () => {
	afterEach(() => {
		jest.resetAllMocks()
	})

	test('Success logout', async () => {
		const spyLogout = jest.spyOn(api, 'logoutFetch').mockResolvedValue({
			message: 'Вы успешно вышли из аккаунта.'
		})
		render(<LogoutButton />)

		const btn = screen.getByText(/выйти/i)

		expect(btn).toBeInTheDocument()
		await userEvent.click(btn)

		await waitFor(() => {
			expect(spyLogout).toHaveBeenCalledTimes(1)

			expect(toast.success).toHaveBeenCalled()
			expect(mockRefresh).toHaveBeenCalled()
		})
	})

	test('Failed logout', async () => {
		const spyLogout = jest
			.spyOn(api, 'logoutFetch')
			.mockRejectedValue(new Error())
		render(<LogoutButton />)

		const btn = screen.getByText(/выйти/i)

		expect(btn).toBeInTheDocument()
		await userEvent.click(btn)

		expect(spyLogout).toHaveBeenCalledTimes(1)

		expect(toast.error).toHaveBeenCalled()
	})
})
