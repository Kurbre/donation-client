'use client'
import Image from 'next/image'
import { useAuth } from '../lib/useAuth'
import { Skeleton } from '@/shared/ui/shadcn/skeleton'
import { useSidebar } from '@/shared/ui/shadcn/sidebar'
import { cn } from '@/shared/utils/classNames'

export default function UserInfo({
	isSidebar = false
}: {
	isSidebar?: boolean
}) {
	const { user, isLoading } = useAuth()
	const { state, isMobile } = useSidebar()

	const isSidebarCollapsed = isSidebar && !isMobile && state === 'collapsed'

	if (isLoading || !user)
		return (
			<div className='flex items-center gap-1'>
				<Skeleton className='h-11.25 w-11.25 rounded-full' />
				<Skeleton className='h-6 w-20' />
			</div>
		)

	return (
		<div
			className={cn(
				'flex items-center gap-1',
				isSidebarCollapsed && 'flex-col'
			)}
		>
			<Image
				src={user.avatarPath}
				className='rounded-full'
				alt='Avatar'
				width={45}
				height={45}
				priority
			/>
			{isSidebarCollapsed ? (
				<span className='font-semibold text-medium leading-0 mt-1 mb-4'>
					{user.name[0]}
					{user.surname[0]}
				</span>
			) : (
				<div className='flex flex-col items-start'>
					<span className='font-semibold text-sm'>
						{user.name} {user.surname}
					</span>
					<span className='text-xs'>{user.email}</span>
				</div>
			)}
		</div>
	)
}
