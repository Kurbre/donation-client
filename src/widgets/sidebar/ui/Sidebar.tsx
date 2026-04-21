'use client'

import { useAuth } from '@/entities/user'
import UserInfo from '@/entities/user/ui/UserInfo'
import { LogoutButton } from '@/features/auth/logout'
import {
	Sidebar as AppSidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarTrigger,
	useSidebar
} from '@/shared/ui/shadcn/sidebar'
import { cn } from '@/shared/utils/classNames'
import { ROUTES } from '@/shared/utils/routes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
	sidebarMenuItemsIfAuth,
	sidebarMenuItemsIfNoAuth
} from '../model/sidebar-menu-items'

export default function Sidebar() {
	const pathName = usePathname()
	const { isAuth } = useAuth()
	const { isMobile, setOpen, setOpenMobile, state } = useSidebar()

	const sidebarItems = isAuth
		? sidebarMenuItemsIfAuth
		: sidebarMenuItemsIfNoAuth

	if (!isMobile) {
		if (pathName.startsWith(ROUTES.auth) || pathName === '/') return null
	}

	return (
		<div>
			<AppSidebar collapsible='icon'>
				<SidebarHeader />
				<SidebarContent>
					<SidebarGroup>
						<SidebarGroup>
							<SidebarMenu className='flex flex-col gap-2'>
								{sidebarItems.map(item => {
									const Icon = item.icon
									const isActive = pathName === item.href

									return (
										<SidebarMenuItem key={item.href + item.label}>
											<SidebarMenuButton
												isActive={isActive}
												tooltip={item.label}
												render={props => (
													<Link
														{...props}
														href={item.href}
														className={cn(
															props.className,
															isActive && 'font-semibold',
															'group-data-[collapsible=icon]:-ml-2'
														)}
														onClick={() => {
															setOpen(false)
															setOpenMobile(false)
														}}
													>
														<Icon size={18} />
														<span className='whitespace-nowrap'>
															{item.label}
														</span>
													</Link>
												)}
											/>
										</SidebarMenuItem>
									)
								})}
							</SidebarMenu>
						</SidebarGroup>
					</SidebarGroup>
				</SidebarContent>
				{isAuth && (
					<SidebarFooter>
						<UserInfo isSidebar />
						<LogoutButton />
					</SidebarFooter>
				)}
				<SidebarTrigger>123</SidebarTrigger>
			</AppSidebar>
		</div>
	)
}
