import { DetailedHTMLProps, InputHTMLAttributes, JSX } from 'react'

export type Input = DetailedHTMLProps<
	InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
> & {
	label?: string
	error?: string
	icon?: () => JSX.Element
}
