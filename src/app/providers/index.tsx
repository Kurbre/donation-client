'use client'
import { SidebarProvider } from '@/shared/ui/shadcn/sidebar'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren, useState } from 'react'
import { ToastContainer } from 'react-toastify'

export default function Providers({ children }: PropsWithChildren) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: 60 * 1000 // Данные считаются свежими 1 минуту
					}
				}
			})
	)

	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ToastContainer theme='dark' position='bottom-right' />
		</QueryClientProvider>
	)
}
