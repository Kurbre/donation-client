'use client'
import { forwardRef, useId } from 'react'
import { type Input } from '../model/types'
import cn from 'classnames'

const InputComponent = forwardRef<HTMLInputElement, Input>(
	({ type = 'text', label, className, error, icon, ...props }, ref) => {
		const id = useId()

		return (
			<div>
				{label && (
					<label
						htmlFor={id}
						className='font-sans font-semibold text-sm text-gray-400'
					>
						{label}
					</label>
				)}
				<div className='relative'>
					<input
						id={id}
						type={type}
						ref={ref}
						{...props}
						className={cn(
							'neon-outline mt-2 dark:bg-foreground-dark rounded-full outline-none pt-3 pb-3.5 w-full text-sm focus:scale-103 peer',
							error && 'neon-error',
							icon ? 'px-13' : 'px-6',
							className
						)}
					/>
					{icon && (
						<span className='absolute top-[56.5%] -translate-y-1/2 left-5 peer-focus:left-4 transition-all duration-300'>
							{icon()}
						</span>
					)}
				</div>
				{error && <span className='text-xs text-error'>{error}</span>}
			</div>
		)
	}
)

export default InputComponent
