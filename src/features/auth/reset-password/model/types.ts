import z from 'zod'
import { sendResetPasswordSchema } from './send-reset-password-schema'
import { resetPasswordSchema } from './reset-password-schema'

export type ResetPasswordData = {
	email: string
}

export type ResetPasswordResponse = {
	message: string
}

export type SendResetPassword = z.infer<typeof sendResetPasswordSchema>
export type ResetPassword = z.infer<typeof resetPasswordSchema>
