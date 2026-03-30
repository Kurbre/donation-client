'use client'
import { Button } from '@/shared/ui/button'
import { useMutation } from '@tanstack/react-query'
import { logoutFetch } from '../api/logout-fetch'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

export default function LogoutButton() {
	const router = useRouter()
	const { mutateAsync } = useMutation({
		mutationFn: logoutFetch,
		onSuccess: data => {
			toast.success(data.message)
		}
	})

	const clickHandler = async () => {
		await mutateAsync()
		router.refresh()
	}

	return <Button onClick={clickHandler}>Выйти</Button>
}
