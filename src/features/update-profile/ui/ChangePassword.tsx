'use client'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { changePasswordSchema } from '../model/change-password-schema'
import { type ChangePassword } from '../model/types'

export default function ChangePassword() {
	const { register, formState, handleSubmit } = useForm<ChangePassword>({
		mode: 'onSubmit',
		resolver: zodResolver(changePasswordSchema)
	})

	const submitHandler = (data: ChangePassword) => {}

	return (
		<form className='px-5' onSubmit={handleSubmit(submitHandler)}>
			<h3 className='text-2xl'>Смена пароля</h3>
			<div className='w-2/6 flex flex-col gap-3 mt-3'>
				<Input
					{...register('password')}
					type='password'
					label='Пароль'
					placeholder='Введите пароль'
					error={formState.errors.password?.message}
				/>
				<Input
					{...register('repeatPassword')}
					type='password'
					placeholder='Повторите пароль'
					label='Повторите пароль'
					error={formState.errors.repeatPassword?.message}
				/>
				<Button size='medium' className='mt-1 w-fit' type='submit'>
					Сменить пароль
				</Button>
			</div>
		</form>
	)
}
