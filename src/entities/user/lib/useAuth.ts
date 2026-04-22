import { useQuery } from '@tanstack/react-query'
import { getProfileFetch } from '../api/get-profile-fetch'

export const useAuth = () => {
	const { data, isLoading, isFetched } = useQuery({
		queryKey: ['profile'],
		queryFn: () => getProfileFetch(),
		retry: false,
		staleTime: 5 * 60 * 1000
	})

	return {
		isAuth: !!data && isFetched,
		user: data,
		isLoading
	}
}
