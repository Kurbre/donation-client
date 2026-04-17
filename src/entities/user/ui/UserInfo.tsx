'use client'
import Image from 'next/image'
import { useAuth } from '../lib/useAuth'

export default function UserInfo() {
	const { user, isAuth } = useAuth()

	if (!isAuth || !user) return

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
