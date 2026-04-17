import { useMutation, useQuery } from '@tanstack/react-query'
import { getProfileFetch } from '../api/get-profile-fetch'
import { useEffect } from 'react'

export const useAuth = () => {
	const { isSuccess, data, isLoading } = useQuery({
		queryKey: ['profile'],
		queryFn: () => getProfileFetch()
	})

	return {
		isAuth: isSuccess,
		user: data,
		isLoading
	}
}
