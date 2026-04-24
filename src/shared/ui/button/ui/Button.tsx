import { forwardRef } from 'react'
import { type ButtonProps } from '../model/types'
import cn from 'classnames'

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{ children, className, styledBorder, type, size = 'big', ...props },
		ref
	) => {
		return (
			<button
				ref={ref}
				type={type}
				className={cn(
					'transition hover:scale-104 duration-300 ease-in-out rounded-xl cursor-pointer font-semibold disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed',
					styledBorder
						? 'border-main border-2'
						: 'from-main to-foremain bg-linear-to-br',
					size === 'small' && 'px-3 py-1 text-xs',
					size === 'medium' && 'px-4.5 py-1.5 text-sm',
					size === 'big' && 'px-6 py-2 text-base',
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
