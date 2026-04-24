import { getAuth } from '@/entities/user/server'
import { Button } from '@/shared/ui/button'
import Link from 'next/link'
import { BiDonateHeart } from 'react-icons/bi'
import { UserDropdownMenu } from './UserDropdownMenu'
import { SidebarTrigger } from '@/shared/ui/shadcn/sidebar'

export default async function Header() {
	const { isAuth } = await getAuth()

	return (
		<header className='bg-foreground-bg'>
			<div className='container flex justify-between items-center py-3'>
				<div className='flex items-center gap-2'>
					<BiDonateHeart size={28} className='text-main' />
					<Link href='/' className='w-fit text-2xl font-mono'>
						Donation
					</Link>
				</div>
				<div className='hidden items-center gap-5 md:flex'>
					{!isAuth ? (
						<Link href='/auth/login'>
							<Button styledBorder>
								<span>Войти</span>
							</Button>
						</Link>
					) : (
						<UserDropdownMenu />
					)}
				</div>
				<SidebarTrigger className='md:hidden block' />
			</div>
		</header>
	)
}
