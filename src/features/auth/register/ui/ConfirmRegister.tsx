'use client'
import { Button } from '@/shared/ui/button'
import { Form } from '@/shared/ui/form'
import { SuccessIcon } from '@/shared/ui/success-icon'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect } from 'react'
import { confirmRegisterFetch } from '../api/confirm-register-fetch'
import { ROUTES } from '@/shared/utils/routes'

const LoadingState = () => (
	<div className='flex items-center justify-center flex-1 text-center font-semibold text-xl'>
		Загрузка...
	</div>
)

function ConfirmRegisterContent() {
	const params = useSearchParams()
	const router = useRouter()
	const token = params.get('token')

	const { mutate, isError, isSuccess, isPending } = useMutation({
		mutationFn: (t: string) => confirmRegisterFetch(t),
		onError: () => {
			router.push('/')
		},
		onSuccess: () => {
			router.refresh()
		}
	})

	useEffect(() => {
		if (!token) {
			router.push('/')
			return
		}

		mutate(token)
	}, [token])

	if (isPending) return <LoadingState />

	if (isError || !isSuccess) {
		return null
	}

	return (
		<div className='flex items-center justify-center flex-1'>
			<Form
				renderTitle={() => (
					<h3 className='font-sans text-2xl font-semibold text-center'>
						Авторизация успешна
					</h3>
				)}
				renderContent={() => (
					<div className='flex flex-col items-center'>
						<SuccessIcon />
						<p className='text-center font-semibold text-lg'>
							Вы успешно зарегистрировались на нашем сайте. Чтобы перейти в
							личный кабинет, нажмите на кнопку ниже
						</p>
					</div>
				)}
				renderFooter={() => (
					<Link href={ROUTES.profile} className='mx-auto'>
						<Button>Перейти в личный кабинет</Button>
					</Link>
				)}
			/>
		</div>
	)
}

export default function ConfirmRegister() {
	return (
		<Suspense fallback={<LoadingState />}>
			<ConfirmRegisterContent />
		</Suspense>
	)
}
