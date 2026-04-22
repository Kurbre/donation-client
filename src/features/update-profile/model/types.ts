import z from 'zod'
import { updateUserSchema } from './update-profile-schema'
import { changePasswordSchema } from './change-password-schema'

export type UpdateUser = z.infer<typeof updateUserSchema>
export type ChangePassword = z.infer<typeof changePasswordSchema>
