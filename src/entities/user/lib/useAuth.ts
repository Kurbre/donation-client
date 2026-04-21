import { useQuery } from '@tanstack/react-query'
import { getProfileFetch } from '../api/get-profile-fetch'

export const useAuth = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['profile'],
		queryFn: () => getProfileFetch()
	})

	return {
		isAuth: !!data,
		user: data,
		isLoading
	}
}
