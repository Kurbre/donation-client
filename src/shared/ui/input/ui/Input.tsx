'use client'
import { forwardRef, useId } from 'react'
import { type Input } from '../model/types'
import cn from 'classnames'

const InputComponent = forwardRef<HTMLInputElement, Input>(
	({ type = 'text', label, className, error, ...props }, ref) => {
		const id = useId()

		return (
			<div>
				{label && (
					<label htmlFor={id} className='font-sans font-semibold text-sm'>
						{label}
					</label>
				)}
				<input
					id={id}
					type={type}
					ref={ref}
					{...props}
					className={cn(
						'bg-white neon-outline mt-2 dark:bg-foreground-dark rounded-full outline-none px-6 pt-3 pb-3.5 w-full text-sm focus:scale-103',
						className
					)}
				/>
				{error && <span className='text-xs text-red-500'>{error}</span>}
			</div>
		)
	}
)

export default InputComponent
