import z from 'zod'
import { loginSchema } from './login-schema'

export type LoginData = {
	email: string
	password: string
}

export type LoginResponse = any

export type Login = z.infer<typeof loginSchema>
