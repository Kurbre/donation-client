import { DetailedHTMLProps, InputHTMLAttributes } from 'react'

export type Input = DetailedHTMLProps<
	InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
> & {
	label?: string
	error?: string
}
