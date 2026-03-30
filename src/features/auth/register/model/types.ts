import z from 'zod'
import { registerSchema } from './register-schema'

export type RegisterData = {
	email: string
	name: string
	surname: string
	password: string
}

export type RegisterResponse = {
	message: string
	errors?: string[]
}

export type Register = z.infer<typeof registerSchema>
