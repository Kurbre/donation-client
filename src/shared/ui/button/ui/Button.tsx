import { forwardRef } from 'react'
import { type ButtonProps } from '../model/types'
import cn from 'classnames'

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ children, className, styledBorder, ...props }, ref) => {
		return (
			<button
				ref={ref}
				className={cn(
					'transition hover:scale-104 duration-300 ease-in-out px-6 py-2 rounded-full cursor-pointer font-semibold disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed',
					styledBorder
						? 'border-main border-2'
						: 'from-main to-foremain bg-linear-to-br',
					className
				)}
				{...props}
			>
				<span className={cn(styledBorder)}>{children}</span>
			</button>
		)
	}
)

export default Button
