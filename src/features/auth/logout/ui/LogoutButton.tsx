'use client'
import { Button } from '@/shared/ui/button'
import { Button as ShadcnButton } from '@/shared/ui/shadcn/button'
import { useLogout } from '../lib/useLogout'
import { useSidebar } from '@/shared/ui/shadcn/sidebar'
import { IoMdExit } from 'react-icons/io'

export default function LogoutButton({}) {
	const { mutate, isPending } = useLogout()
	const { setOpenMobile, setOpen, state, isMobile } = useSidebar()

	const clickHandler = () => {
		mutate()
		setOpenMobile(false)
		setOpen(false)
	}

	return !isMobile && state === 'collapsed' ? (
		<ShadcnButton
			className='from-main to-foremain bg-linear-to-br text-white'
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
