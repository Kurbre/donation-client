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
	SidebarTrigger
} from '@/shared/ui/shadcn/sidebar'
import { cn } from '@/shared/utils/classNames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { sidebarMenuItems } from '../model/sidebar-menu-items'

export default function Sidebar() {
	const pathName = usePathname()

	if (pathName === '/' || pathName.includes('auth')) return null

	return (
		<div>
			<AppSidebar collapsible='icon'>
				<SidebarHeader />
				<SidebarContent>
					<SidebarGroup>
						<SidebarGroup>
							<SidebarMenu className='flex flex-col gap-2'>
								{sidebarMenuItems.map(item => {
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
				<SidebarFooter />
				<SidebarTrigger>123</SidebarTrigger>
			</AppSidebar>
		</div>
	)
}
