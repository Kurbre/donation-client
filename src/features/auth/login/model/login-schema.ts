import { z } from 'zod'

export const loginSchema = z.object({
	email: z
		.string('Поле Email не может быть пустым')
		.email('Email не валидный')
		.min(2, 'Минимальная длина Email 6 символов')
		.max(32, 'Максимальная длина Email 64 символа'),
	password: z
		.string('Поле пароль не может быть пустым')
		.min(6, 'Минимальная длина пароля 6 символов')
		.max(32, 'Максимальная длина пароля 32 символа')
})
