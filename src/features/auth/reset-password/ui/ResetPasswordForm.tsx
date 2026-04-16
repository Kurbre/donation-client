'use client'
import { Button } from '@/shared/ui/button'
import { Form } from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { MdOutlineMail } from 'react-icons/md'
import { toast } from 'react-toastify'
import { sendResetPasswordFetch } from '../api/send-reset-password-fetch'
import { sendResetPasswordSchema } from '../model/send-reset-password-schema'
import { SendResetPassword, ResetPasswordData } from '../model/types'
import { SuccessIcon } from '@/shared/ui/success-icon'
import { ROUTES } from '@/shared/utils/routes'

export default function ResetPasswordForm() {
	const { mutateAsync, isPending, isSuccess } = useMutation({
		mutationFn: (data: ResetPasswordData) => sendResetPasswordFetch(data),
		onError: err => toast.error(err.message)
	})

	const { handleSubmit, formState, register } = useForm<SendResetPassword>({
		resolver: zodResolver(sendResetPasswordSchema),
		mode: 'onChange'
	})

	const submitHandler = async (data: SendResetPassword) => mutateAsync(data)

	return (
		<Form
			onSubmit={handleSubmit(submitHandler)}
			footerPosition='center'
			renderTitle={() => (
				<h3 className='font-sans text-2xl font-semibold text-center text-neon-gradient'>
					Запрос о сбросе пароля
				</h3>
			)}
			renderContent={() =>
				isSuccess ? (
					<div className='flex flex-col items-center'>
						<SuccessIcon />
						<p className='text-center font-semibold text-lg text-gray-300'>
							Если email зарегестрирован, письмо отправлено. Пожалуйста
							проверьте свою электронную почту, и следуйте указаниям в письме
						</p>
					</div>
				) : (
					<Input
						label='Email'
						placeholder='Введите email'
						type='email'
						error={formState.errors.email?.message}
						icon={() => <MdOutlineMail size={21} className='text-gray-400' />}
						{...register('email')}
					/>
				)
			}
			renderFooter={() => (
				<div className='w-full mb-2'>
					{isSuccess ? (
						<Link href='/' className='flex justify-center'>
							<Button>Вернутся на главную страницу</Button>
						</Link>
					) : (
						<Button disabled={isPending} className='w-full'>
							Отправить запрос
						</Button>
					)}
					<div className='mt-6 flex justify-between items-center'>
						<Link
							href={ROUTES.login}
							className='text-xs text-gray-400 transition-opacity duration-200 hover:opacity-70'
						>
							Уже есть аккаунт? Войти
						</Link>
						<Link
							href={ROUTES.register}
							className='text-xs text-gray-400 transition-opacity duration-200 hover:opacity-70'
						>
							Ещё нет аккаунта? Зарегестрироваться
						</Link>
					</div>
				</div>
			)}
		/>
	)
}
