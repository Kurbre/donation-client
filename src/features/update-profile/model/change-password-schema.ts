import { z } from 'zod'

export const changePasswordSchema = z
	.object({
		password: z
			.string('Поле пароль не может быть пустым')
			.min(6, 'Минимальная длина пароля 6 символов')
			.max(32, 'Максимальная длина пароля 32 символа'),

		repeatPassword: z
			.string('Поле повтора пароля не может быть пустым')
			.min(6, 'Минимальная длина пароля 6 символов')
			.max(32, 'Максимальная длина пароля 32 символа')
	})
	.refine(data => data.password === data.repeatPassword, {
		path: ['repeatPassword'],
		message: 'Пароли не совпадают'
	})
