'use client'
import { Button } from '@/shared/ui/button'
import { Form } from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'
import { SuccessIcon } from '@/shared/ui/success-icon'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Login, LoginData } from '../model/types'
import { loginFetch } from '../api/login-fetch'
import { loginSchema } from '../model/login-schema'
import { toast } from 'react-toastify'
import { MdOutlineMail } from 'react-icons/md'
import { CiLock } from 'react-icons/ci'
import Link from 'next/link'
import { ROUTES } from '@/shared/utils/routes'

export default function LoginForm() {
	const router = useRouter()

	const { mutate, isPending } = useMutation({
		mutationFn: (data: LoginData) => loginFetch(data),
		mutationKey: ['profile'],
		onSuccess: data => {
			toast.success(`${data.name} вы успешно авторизовались`)
			if (document.referrer && !document.referrer.includes('/auth/login')) {
				router.back()
			} else {
				router.push('/')
			}

			router.refresh()
		},
		onError: err => toast.error(err.message)
	})

	const { handleSubmit, formState, register } = useForm<Login>({
		resolver: zodResolver(loginSchema),
		mode: 'onSubmit'
	})

	const submitHandler = (data: Login) => mutate(data)

	return (
		<Form
			onSubmit={handleSubmit(submitHandler)}
			footerPosition='center'
			renderTitle={() => (
				<h3 className='font-sans text-2xl font-semibold text-center text-neon-gradient'>
					Авторизация
				</h3>
			)}
			renderContent={() => (
				<>
					<Input
						label='Email'
						placeholder='Введите email'
						type='email'
						error={formState.errors.email?.message}
						icon={() => <MdOutlineMail size={21} className='text-gray-400' />}
						data-testid='email-login-input'
						{...register('email')}
					/>
					<Input
						label='Пароль'
						placeholder='Введите пароль'
						type='password'
						error={formState.errors.password?.message}
						icon={() => <CiLock size={21} className='text-gray-400' />}
						data-testid='password-login-input'
						{...register('password')}
					/>
				</>
			)}
			renderFooter={() => (
				<div className='w-full mb-2'>
					<Button
						disabled={isPending}
						className='w-full'
						data-testid='login-button'
					>
						Войти
					</Button>
					<div className='mt-6 flex justify-between items-center'>
						<Link
							href={ROUTES.resetPassword}
							className='text-xs text-gray-400 transition-opacity duration-200 whitespace-nowrap hover:opacity-70'
						>
							Забыли пароль?
						</Link>
						<Link
							href={ROUTES.register}
							className='text-xs text-gray-400 transition-opacity duration-200 hover:opacity-70 text-right'
						>
							Ещё нет аккаунта? Зарегистрироваться
						</Link>
					</div>
				</div>
			)}
		/>
	)
}
