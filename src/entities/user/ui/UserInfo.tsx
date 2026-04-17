'use client'
import Image from 'next/image'
import { useAuth } from '../lib/useAuth'
import { Skeleton } from '@/shared/ui/shadcn/skeleton'

export default function UserInfo() {
	const { user, isLoading } = useAuth()

	if (isLoading || !user)
		return (
			<div className='flex items-center gap-1'>
				<Skeleton className='h-11.25 w-11.25 rounded-full' />
				<Skeleton className='h-6 w-20' />
			</div>
		)

	return (
		<div className='flex items-center gap-1'>
			<Image
				src={user.avatarPath}
				className='rounded-full'
				alt='Avatar'
				width={45}
				height={45}
			/>
			<span className='font-semibold'>
				{user.name} {user.surname}
			</span>
		</div>
	)
}
