'use client'
import { Button } from '@/shared/ui/button'
import { Form } from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'
import { SuccessIcon } from '@/shared/ui/success-icon'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { registerFetch } from '../api/register-fetch'
import { registerSchema } from '../model/register-schema'
import { Register, RegisterData } from '../model/types'

export default function RegisterForm() {
	const router = useRouter()

	const { mutateAsync, isSuccess, reset } = useMutation({
		mutationFn: (data: RegisterData) => registerFetch(data)
	})

	const { handleSubmit, formState, register } = useForm<Register>({
		resolver: zodResolver(registerSchema),
		mode: 'onChange'
	})

	const submitHandler = async ({ repeatPassword, ...data }: Register) => {
		await mutateAsync(data)
	}

	return (
		<Form
			onSubmit={handleSubmit(submitHandler)}
			footerPosition='center'
			renderTitle={() => (
				<h3 className='font-sans text-2xl font-semibold text-center'>
					Регистрация
				</h3>
			)}
			renderContent={() =>
				isSuccess ? (
					<div className='flex flex-col items-center'>
						<SuccessIcon />
						<p className='text-center font-semibold text-lg'>
							Если email не зарегестрирован, письмо отправлено. Пожалуйста
							проверьте свою электронную почту, и следуйте указаниям в письме
						</p>
					</div>
				) : (
					<>
						<Input
							label='Email'
							placeholder='Введите email'
							type='email'
							error={formState.errors.email?.message}
							{...register('email')}
						/>
						<Input
							label='Имя'
							placeholder='Введите имя'
							error={formState.errors.name?.message}
							{...register('name')}
						/>
						<Input
							label='Фамилия'
							placeholder='Введите фамилию'
							error={formState.errors.surname?.message}
							{...register('surname')}
						/>
						<Input
							label='Пароль'
							placeholder='Введите пароль'
							type='password'
							error={formState.errors.password?.message}
							{...register('password')}
						/>
						<Input
							label='Повторите пароль'
							placeholder='Введите пароль ещё раз'
							type='password'
							error={formState.errors.repeatPassword?.message}
							{...register('repeatPassword')}
						/>
					</>
				)
			}
			renderFooter={() =>
				isSuccess ? (
					<Button onClick={() => router.push('/')}>
						Вернутся на главную страницу
					</Button>
				) : (
					<Button>Зарегестрироваться</Button>
				)
			}
		/>
	)
}
