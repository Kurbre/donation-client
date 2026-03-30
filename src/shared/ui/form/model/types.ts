import { DetailedHTMLProps, FormHTMLAttributes, JSX } from 'react'

export type FormProps = DetailedHTMLProps<
	FormHTMLAttributes<HTMLFormElement>,
	HTMLFormElement
> & {
	renderTitle: () => JSX.Element
	renderContent: () => JSX.Element
	renderFooter: () => JSX.Element
	footerPosition?: 'left' | 'center' | 'right'
}
