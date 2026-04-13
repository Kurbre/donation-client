import { z } from 'zod'

export const sendResetPasswordSchema = z.object({
	email: z
		.string('Поле Email не может быть пустым')
		.email('Email не валидный')
		.min(2, 'Минимальная длина Email 6 символов')
		.max(32, 'Максимальная длина Email 64 символа')
})
