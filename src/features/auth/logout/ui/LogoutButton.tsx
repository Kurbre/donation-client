'use client'
import { Button } from '@/shared/ui/button'
import { useMutation } from '@tanstack/react-query'
import { logoutFetch } from '../api/logout-fetch'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

export default function LogoutButton() {
	const router = useRouter()
	const { mutate } = useMutation({
		mutationFn: logoutFetch,
		onSuccess: data => {
			toast.success(data.message)
			router.refresh()
		}
	})

	return (
		<Button onClick={() => mutate()} styledBorder>
			Выйти
		</Button>
	)
}
