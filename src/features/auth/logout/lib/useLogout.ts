'use client'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { logoutFetch } from '../api/logout-fetch'
import { toast } from 'react-toastify'

export const useLogout = () => {
	const router = useRouter()
	const mutate = useMutation({
		mutationKey: ['profile'],
		mutationFn: logoutFetch,
		onSuccess: data => {
			toast.success(data.message)
			router.refresh()
		},
		onError: error => {
			toast.error(error.message)
		}
	})

	return mutate
}
