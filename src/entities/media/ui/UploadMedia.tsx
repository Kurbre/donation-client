'use client'
import { Button } from '@/shared/ui/button'
import { ChangeEvent, useId, useRef } from 'react'
import { toast } from 'react-toastify'
import { uploadMedia } from '../api/upload-media'
import { UploadMediaProps } from '../model/types'
import { formatMediaLabel } from '../model/formatMediaLabel'

export default function UploadMedia({
	setFileSrc,
	label = 'Загрузить файл'
}: UploadMediaProps) {
	const ref = useRef<HTMLInputElement>(null)

	const changeHandler = async (
		event: ChangeEvent<HTMLInputElement, HTMLInputElement>
	) => {
		try {
			const file = event.target.files?.[0]
			if (!file) return

			const data = await uploadMedia(file)

			setFileSrc?.(data.url)

			const mediaLabel = formatMediaLabel(file.type)
			toast.success(`Вы успешно загрузили ${mediaLabel}.`)
		} catch (error) {
			toast.error('Не удалось загрузить файл')
		}
	}

	return (
		<>
			<Button onClick={() => ref.current?.click()}>{label}</Button>
			<input
				type='file'
				ref={ref}
				className='hidden'
				onChange={changeHandler}
				data-testid='upload-file-input'
			/>
		</>
	)
}
