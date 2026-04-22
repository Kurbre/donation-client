import { UpdateProfile, ChangePassword } from '@/features/update-profile'

export default function ProfileSettings() {
	return (
		<div className='container py-10 h-full'>
			<div className='card h-full flex flex-col gap-5'>
				<h1 className='text-3xl mb-5 text-center font-semibold'>Настройки</h1>
				<UpdateProfile />
				<ChangePassword />
			</div>
		</div>
	)
}
