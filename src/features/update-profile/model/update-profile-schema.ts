import { z } from 'zod'

export const updateUserSchema = z.object({
	name: z
		.string('Поле имя не может быть пустым')
		.min(2, 'Минимальная длина имени 2 символа')
		.max(32, 'Максимальная длина имени 64 символа')
		.optional()
		.or(z.literal('')),

	surname: z
		.string('Поле фамилия не может быть пустым')
		.min(2, 'Минимальная длина фамилии 2 символа')
		.max(32, 'Максимальная длина фамилии 64 символа')
		.optional()
		.or(z.literal(''))
})
