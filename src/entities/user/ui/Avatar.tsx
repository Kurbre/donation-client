'use client'
import { Skeleton } from '@/shared/ui/shadcn/skeleton'
import Image from 'next/image'
import { useAuth } from '../lib/useAuth'

export default function Avatar() {
	const { user, isAuth } = useAuth()

	if (!user || !isAuth)
		return <Skeleton className='h-11.25 w-11.25 rounded-full' />

	return (
		<div className='w-9.25 h-9.25 rounded-full overflow-hidden'>
			<Image
				src={user.avatarPath}
				className='rounded-full w-full h-full object-cover'
				alt='Avatar'
				width={45}
				height={45}
				priority
				draggable={false}
			/>
		</div>
	)
}
