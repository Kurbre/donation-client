'use client'
import { Button } from '@/shared/ui/button'
import { Button as ShadcnButton } from '@/shared/ui/shadcn/button'
import { useLogout } from '../lib/useLogout'
import { useSidebar } from '@/shared/ui/shadcn/sidebar'
import { IoMdExit } from 'react-icons/io'
import { useQueryClient } from '@tanstack/react-query'

export default function LogoutButton({}) {
	const { mutate, isPending } = useLogout()
	const { setOpenMobile, setOpen, state, isMobile } = useSidebar()
	const queryClient = useQueryClient()

	const clickHandler = () => {
		mutate()
		queryClient.removeQueries({ queryKey: ['profile'] })
		setOpenMobile(false)
		setOpen(false)
	}

	return !isMobile && state === 'collapsed' ? (
		<ShadcnButton
			className='from-main to-foremain bg-linear-to-br text-white cursor-pointer'
			onClick={clickHandler}
			disabled={isPending}
		>
			<IoMdExit />
		</ShadcnButton>
	) : (
		<Button
			className='text-sm py-0'
			onClick={clickHandler}
			disabled={isPending}
		>
			Выйти
		</Button>
	)
}
