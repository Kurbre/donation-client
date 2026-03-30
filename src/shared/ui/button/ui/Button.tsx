import { forwardRef } from 'react'
import { type ButtonProps } from '../model/types'
import cn from 'classnames'

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ children, className, styledBorder, ...props }, ref) => {
		return (
			<button
				ref={ref}
				className={cn(
					'transition-transform duration-200 hover:scale-105 px-6 py-2 rounded-full cursor-pointer font-semibold disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed',
					styledBorder ? 'neon-outline' : 'neon-gradient',
					className
				)}
				{...props}
			>
				<span className={cn(styledBorder && 'text-neon-gradient')}>
					{children}
				</span>
			</button>
		)
	}
)

export default Button
