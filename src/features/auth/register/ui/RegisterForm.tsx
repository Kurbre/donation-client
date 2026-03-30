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
import Link from 'next/link'
import { MdOutlineMail } from 'react-icons/md'
import { CiLock } from 'react-icons/ci'
import { FaRegUser } from 'react-icons/fa'
import { toast } from 'react-toastify'

export default function RegisterForm() {
	const router = useRouter()

	const { mutateAsync, isSuccess, isPending } = useMutation({
		mutationFn: (data: RegisterData) => registerFetch(data),
		onSuccess: data => {},
		onError: err => toast.error(err.message)
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
				<h3 className='font-sans text-2xl font-semibold text-center text-neon-gradient'>
					Регистрация
				</h3>
			)}
			renderContent={() =>
				isSuccess ? (
					<div className='flex flex-col items-center'>
						<SuccessIcon />
						<p className='text-center font-semibold text-lg text-gray-300'>
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
							icon={() => <MdOutlineMail size={21} className='text-gray-400' />}
							{...register('email')}
						/>
						<Input
							label='Имя'
							placeholder='Введите имя'
							error={formState.errors.name?.message}
							icon={() => <FaRegUser size={21} className='text-gray-400' />}
							{...register('name')}
						/>
						<Input
							label='Фамилия'
							placeholder='Введите фамилию'
							error={formState.errors.surname?.message}
							icon={() => <FaRegUser size={21} className='text-gray-400' />}
							{...register('surname')}
						/>
						<Input
							label='Пароль'
							placeholder='Введите пароль'
							type='password'
							error={formState.errors.password?.message}
							icon={() => <CiLock size={21} className='text-gray-400' />}
							{...register('password')}
						/>
						<Input
							label='Повторите пароль'
							placeholder='Введите пароль ещё раз'
							type='password'
							error={formState.errors.repeatPassword?.message}
							icon={() => <CiLock size={21} className='text-gray-400' />}
							{...register('repeatPassword')}
						/>
					</>
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
							Зарегестрироваться
						</Button>
					)}
					<div className='mt-6 flex justify-center items-center'>
						<Link
							href='/auth/login'
							className='text-xs text-gray-400 transition-opacity duration-200 hover:opacity-70'
						>
							Уже есть аккаунт? Войти
						</Link>
					</div>
				</div>
			)}
		/>
	)
}
