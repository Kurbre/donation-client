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
				<div
					className={cn(
						'p-px rounded-full w-full mt-1',
						error ? 'bg-red-500' : 'gradient'
					)}
				>
					<input
						id={id}
						type={type}
						ref={ref}
						{...props}
						className={cn(
							'bg-white dark:bg-foreground-dark rounded-full outline-none px-4 pt-2 pb-2.5 w-full text-sm',
							className
						)}
					/>
				</div>
				{error && <span className='text-xs text-red-500'>{error}</span>}
			</div>
		)
	}
)

export default InputComponent
