import * as React from 'react'

type LinkProps = {
	href: string
	children: React.ReactNode
} & React.AnchorHTMLAttributes<HTMLAnchorElement>

const Link = ({ href, children, onClick, ...props }: LinkProps) => (
	<a
		href={href}
		onClick={event => {
			event.preventDefault()
			if (onClick) {
				onClick(event)
			}
		}}
		{...props}
	>
		{children}
	</a>
)

export default Link
