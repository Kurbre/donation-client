import { useQuery } from '@tanstack/react-query'
import { getProfileFetch } from '../api/get-profile-fetch'

export const useAuth = () => {
	const { isSuccess, data, isLoading } = useQuery({
		queryKey: ['profile'],
		queryFn: () => getProfileFetch(),
		retry: false
	})

	return {
		isAuth: isSuccess,
		user: data,
		isLoading
	}
}
