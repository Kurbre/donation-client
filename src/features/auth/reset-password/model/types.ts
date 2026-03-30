import z from 'zod'
import { resetPasswordSchema } from './reset-password-schema'

export type ResetPasswordData = {
	email: string
}

export type ResetPasswordResponse = {
	message: string
}

export type ResetPassword = z.infer<typeof resetPasswordSchema>
