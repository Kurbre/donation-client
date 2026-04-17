import { checkAuth } from '@/entities/user'
import { LogoutButton } from '@/features/auth/logout'
import { Button } from '@/shared/ui/button'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { BiDonateHeart } from 'react-icons/bi'

export default async function Header() {
	const isAuth = await checkAuth()

	return (
		<header className='bg-[#1c1c1c]'>
			<div className='container flex justify-between items-center py-3'>
				<div className='flex items-center gap-2'>
					<BiDonateHeart size={28} className='text-main' />
					<Link href='/' className='w-fit text-2xl font-mono'>
						Donation
					</Link>
				</div>
				<div className='flex items-center gap-5'>
					{!isAuth ? (
						<Link href='/auth/login'>
							<Button styledBorder>
								<span>Войти</span>
							</Button>
						</Link>
					) : (
						<LogoutButton />
					)}
				</div>
			</div>
		</header>
	)
}
