'use client'
import { Button } from '@/shared/ui/button'
import { Form } from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { resetPasswordFetch } from '../api/reset-password-fetch'
import { resetPasswordTokenFetch } from '../api/reset-password-token-fetch'
import { resetPasswordSchema } from '../model/reset-password-schema'
import { ResetPassword } from '../model/types'
import { SuccessIcon } from '@/shared/ui/success-icon'

const LoadingState = () => (
	<div className='flex items-center justify-center flex-1 text-center font-semibold text-xl'>
		Загрузка...
	</div>
)

function ConfirmedResetPasswordContent() {
	const params = useSearchParams()
	const router = useRouter()
	const token = params.get('token')

	const { isError: isTokenError, isLoading } = useQuery({
		queryKey: ['reset-password', token],
		queryFn: () => resetPasswordTokenFetch(token || ''),
		enabled: !!token,
		retry: false
	})

	const { mutate, isPending, data } = useMutation({
		mutationFn: (password: string) => resetPasswordFetch(token || '', password),
		onError: error => {
			toast.error(error.message)
			router.push('/')
		},
		onSuccess: () => {
			router.refresh()
		}
	})

	const { register, handleSubmit, formState } = useForm<ResetPassword>({
		mode: 'onChange',
		resolver: zodResolver(resetPasswordSchema)
	})

	const submitHandler = (data: ResetPassword) => {
		mutate(data.password)
	}

	useEffect(() => {
		if (!token || isTokenError) {
			router.push('/')
			return
		}
	}, [token, router, isTokenError])

	if (isPending || isLoading) return <LoadingState />

	if (isTokenError) {
		return null
	}

	return (
		<div className='flex items-center justify-center flex-1'>
			<Form
				renderTitle={() => (
					<h3 className='font-sans text-2xl font-semibold text-center'>
						Сброс пароля
					</h3>
				)}
				renderContent={() =>
					data ? (
						<div className='flex flex-col items-center'>
							<SuccessIcon />
							<p className='text-center font-semibold text-lg text-gray-300'>
								Вы успешно изменили пароль. Вы можете войти в аккаунт по кнопке
								ниже, используя только что установленный пароль.
							</p>
						</div>
					) : (
						<>
							<Input
								label='Введите новый пароль'
								error={formState.errors.password?.message}
								type='password'
								{...register('password')}
							/>
							<Input
								label='Повторите новый пароль'
								error={formState.errors.repeatPassword?.message}
								type='password'
								{...register('repeatPassword')}
							/>
						</>
					)
				}
				renderFooter={() =>
					data ? (
						<Link href='/auth/login' className='mx-auto'>
							<Button disabled={isLoading || isPending}>Авторизоваться</Button>
						</Link>
					) : (
						<Button
							type='submit'
							className='mx-auto'
							disabled={isLoading && isPending}
						>
							Сбросить пароль
						</Button>
					)
				}
				onSubmit={handleSubmit(submitHandler)}
			/>
		</div>
	)
}

export default function ConfirmedResetPasswordForm() {
	return (
		<Suspense fallback={<LoadingState />}>
			<ConfirmedResetPasswordContent />
		</Suspense>
	)
}
