import { forwardRef } from 'react'
import { type ButtonProps } from '../model/types'
import cn from 'classnames'

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ children, className, ...props }, ref) => {
		return (
			<button
				ref={ref}
				className={cn(
					'gradient transition-transform duration-200 hover:scale-105 px-6 py-2 rounded-full cursor-pointer font-semibold shadow-md disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed',
					className
				)}
				{...props}
			>
				{children}
			</button>
		)
	}
)

export default Button
