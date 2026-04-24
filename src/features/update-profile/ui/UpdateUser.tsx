'use client'
import { Input } from '@/shared/ui/input'
import { useForm } from 'react-hook-form'
import { updateUserSchema } from '../model/update-profile-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { type UpdateUser } from '../model/types'
import { Button } from '@/shared/ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateUserFetch } from '@/entities/user/api/update-user-fetch'
import { toast } from 'react-toastify'
import { Avatar, UpdateUserData, useAuth } from '@/entities/user'
import { UploadMedia } from '@/entities/media'
import { useState } from 'react'

export default function UpdateUser() {
	const { register, formState, handleSubmit } = useForm<UpdateUser>({
		mode: 'onSubmit',
		resolver: zodResolver(updateUserSchema)
	})

	const queryClient = useQueryClient()
	const { user } = useAuth()
	const [avatarFile, setAvatarFile] = useState('')

	const { mutate, isPending } = useMutation({
		mutationKey: ['profile'],
		mutationFn: (data: UpdateUserData) => updateUserFetch(data),
		onSuccess: () => {
			toast.success('Вы успешно обновили аккаунт')
			queryClient.invalidateQueries({ queryKey: ['profile'] })
		},
		onError: error => {
			error.message.split(',').forEach(err => toast.error(err))
		}
	})

	const submitHandler = (data: UpdateUser) => {
		if (!user) return

		const dto: Partial<UpdateUserData> = {}

		Object.entries(data).forEach(([key, value]) => {
			if (value === user[key as keyof typeof user]) return

			dto[key as keyof UpdateUser] = value
		})

		if (avatarFile.length > 0) {
			dto.avatarPath = avatarFile
		}

		if (Object.keys(dto).length <= 0) {
			toast.info('Изменения не обнаружены')
			return
		}

		mutate(dto)
	}

	return (
		<form className='px-5' onSubmit={handleSubmit(submitHandler)}>
			<h3 className='text-2xl'>Аккаунт</h3>
			<div className='w-2/6 flex flex-col gap-3 mt-3'>
				<div>
					<span className='font-sans font-semibold text-sm text-gray-400'>
						Аватар
					</span>
					<div className='flex gap-3 items-center mt-1'>
						<Avatar />
						<UploadMedia setFileSrc={setAvatarFile} />
					</div>
				</div>
				<Input
					{...register('name')}
					placeholder='Имя'
					label='Введите имя'
					error={formState.errors.name?.message}
					defaultValue={user?.name}
				/>
				<Input
					{...register('surname')}
					placeholder='Фамилию'
					label='Введите фамилию'
					error={formState.errors.surname?.message}
					defaultValue={user?.surname}
				/>
				<Button
					className='mt-1 w-fit'
					size='medium'
					type='submit'
					disabled={isPending}
				>
					Сохранить
				</Button>
			</div>
		</form>
	)
}
