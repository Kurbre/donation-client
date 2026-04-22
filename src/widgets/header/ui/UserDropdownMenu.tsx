'use client'

import UserInfo from '@/entities/user/ui/UserInfo'
import { useLogout } from '@/features/auth/logout'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/shared/ui/shadcn/dropdown-menu'
import { cn } from '@/shared/utils/classNames'
import { ROUTES } from '@/shared/utils/routes'
import { useQueryClient } from '@tanstack/react-query'
import { LucideLayoutDashboard } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { IoMdArrowDropdown, IoMdExit, IoMdSettings } from 'react-icons/io'

export function UserDropdownMenu() {
	const [isOpenMenu, setIsOpenMenu] = useState(false)
	const { mutate: mutateLogout, isPending: isPendingLogout } = useLogout()
	const queryClient = useQueryClient()

	const logoutClickHandler = () => {
		mutateLogout()
		queryClient.removeQueries({ queryKey: ['profile'] })
	}

	return (
		<DropdownMenu open={isOpenMenu} onOpenChange={setIsOpenMenu}>
			<DropdownMenuTrigger>
				<div className='flex items-center gap-1 cursor-pointer'>
					<UserInfo />
					<span
						className={cn(
							'inline-block transform transition-transform ease-in-out duration-200 rotate-180',
							isOpenMenu && 'rotate-0'
						)}
					>
						<IoMdArrowDropdown size={31} />
					</span>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='start' className='w-[calc(100%+20px)]'>
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<Link
							href={ROUTES.profile}
							className='flex items-center gap-2 cursor-pointer'
						>
							<LucideLayoutDashboard />
							<span className='-mt-0.5'>Панель управления</span>
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Link
							href={ROUTES.settings}
							className='flex items-center gap-2 cursor-pointer'
						>
							<IoMdSettings />
							<span className='-mt-0.5'>Настройки аккаунта</span>
						</Link>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem
						className='flex items-center gap-2 cursor-pointer'
						onClick={logoutClickHandler}
						disabled={isPendingLogout}
					>
						<IoMdExit />
						<span className='-mt-0.5'>Выйти</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
