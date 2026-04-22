import { ROUTES } from '@/shared/utils/routes'
import { LucideLayoutDashboard, LucideSettings } from 'lucide-react'
import { FiLogIn } from 'react-icons/fi'
import { IoMdSettings } from 'react-icons/io'

export const sidebarMenuItemsIfAuth = [
	{
		label: 'Панель управления',
		href: ROUTES.profile,
		icon: LucideLayoutDashboard
	},
	{
		label: 'Настройки аккаунта',
		href: ROUTES.settings,
		icon: IoMdSettings
	}
]
export const sidebarMenuItemsIfNoAuth = [
	{
		label: 'Войти',
		href: ROUTES.login,
		icon: FiLogIn
	},
	{
		label: 'Регистрация',
		href: ROUTES.register,
		icon: FiLogIn
	}
]
