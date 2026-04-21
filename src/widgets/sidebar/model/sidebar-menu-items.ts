import { ROUTES } from '@/shared/utils/routes'
import { LucideLayoutDashboard, LucideSettings } from 'lucide-react'

export const sidebarMenuItems = [
	{
		label: 'Панель управления',
		href: ROUTES.profile,
		icon: LucideLayoutDashboard
	},
	{
		label: 'Настройки',
		href: ROUTES.register,
		icon: LucideSettings
	}
]
