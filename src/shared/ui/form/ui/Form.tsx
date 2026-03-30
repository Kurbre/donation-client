import cn from 'classnames'
import { FormProps } from '../model/types'

export default function Form({
	renderContent,
	renderFooter,
	renderTitle,
	className,
	footerPosition = 'left',
	...props
}: FormProps) {
	return (
		<form
			className={cn(
				'bg-[rgba(49,49,49,0.4)] backdrop-blur-md shadow-2xl px-6 py-3 rounded-xl flex flex-col max-w-112.5 w-full mx-auto',
				className
			)}
			{...props}
		>
			<div className='border-b border-b-silver pb-2'>{renderTitle()}</div>
			<div className='mt-5 flex flex-col gap-3'>{renderContent()}</div>
			<div
				className={cn(
					'mt-5 flex items-center',
					footerPosition === 'left' && 'justify-start',
					footerPosition === 'center' && 'justify-center',
					footerPosition === 'right' && 'justify-end'
				)}
			>
				{renderFooter()}
			</div>
		</form>
	)
}
