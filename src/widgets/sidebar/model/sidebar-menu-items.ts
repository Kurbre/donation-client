import { ROUTES } from '@/shared/utils/routes'
import { LucideLayoutDashboard, LucideSettings } from 'lucide-react'
import { FiLogIn } from 'react-icons/fi'

export const sidebarMenuItemsIfAuth = [
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
export const sidebarMenuItemsIfNoAuth = [
	{
		label: 'Войти',
		href: ROUTES.login,
		icon: FiLogIn
	},
	{
		label: 'Настройки',
		href: ROUTES.register,
		icon: LucideSettings
	}
]
