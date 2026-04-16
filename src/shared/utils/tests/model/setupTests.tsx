import '@testing-library/jest-dom'

jest.mock('react-toastify', () => ({
	toast: {
		success: jest.fn(),
		error: jest.fn()
	},
	ToastContainer: () => <div data-testid='toast-container' />
}))

export const mockPush = jest.fn()
export const mockBack = jest.fn()
export const mockRefresh = jest.fn()

export const mockGet = jest.fn((key: string) => {
	if (key === 'token') return 'test-token-123'
	return null
})

jest.mock('next/navigation', () => ({
	useRouter: () => ({
		push: mockPush,
		back: mockBack,
		refresh: mockRefresh
	}),
	useSearchParams: () => ({
		get: mockGet
	})
}))
