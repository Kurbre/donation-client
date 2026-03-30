import { checkAuth } from '@/entities/user'
import { LogoutButton } from '@/features/auth/logout'
import { Button } from '@/shared/ui/button'
import Link from 'next/link'

export default async function Header() {
	const isAuth = await checkAuth()

	console.log(isAuth)

	return (
		<header className='bg-[#1c1c1c]'>
			<div className='container flex justify-between items-center py-3'>
				<Link
					href='/'
					className='text-neon-gradient w-fit text-2xl font-roboto'
				>
					Donation
				</Link>
				<div className='flex items-center gap-5'>
					{!isAuth ? (
						<Link href='/auth/login'>
							<Button styledBorder>
								<span className='text-neon-gradient'>Войти</span>
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
