'use client'
import { Button } from '@/shared/ui/button'
import { useLogout } from '../lib/useLogout'

export default function LogoutButton() {
	const { mutate, isPending } = useLogout()

	return (
		<Button onClick={() => mutate()} disabled={isPending} styledBorder>
			Выйти
		</Button>
	)
}
