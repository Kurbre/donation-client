'use client'

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
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
	sidebarMenuItemsIfAuth,
	sidebarMenuItemsIfNoAuth
} from '../model/sidebar-menu-items'
import { useCallback } from 'react'
import { useAuth } from '@/entities/user'
import { ROUTES } from '@/shared/utils/routes'
import UserInfo from '@/entities/user/ui/UserInfo'

export default function Sidebar() {
	const pathName = usePathname()
	const { isAuth } = useAuth()
	const { isMobile } = useSidebar()

	const getSidebarItems = useCallback(
		() => (isAuth ? sidebarMenuItemsIfAuth : sidebarMenuItemsIfNoAuth),
		[isAuth]
	)

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
								{getSidebarItems().map(item => {
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
						<UserInfo />
					</SidebarFooter>
				)}
				<SidebarTrigger>123</SidebarTrigger>
			</AppSidebar>
		</div>
	)
}
