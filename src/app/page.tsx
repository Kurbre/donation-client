'use client'
import { getProfileFetch } from '@/entities/user/api/get-profile-fetch'
import { Button } from '@/shared/ui/button'
import { useMutation } from '@tanstack/react-query'

export default function Home() {
	const { mutate, data, isSuccess } = useMutation({
		mutationFn: () => getProfileFetch()
	})

	return (
		<div>
			<span>{isSuccess ? data?.email : 'Нету'}</span>
			<Button onClick={() => mutate()}>Проверить авторизацию</Button>
		</div>
	)
}
