import { getProfileFetch } from '../api/get-profile-fetch'

export const checkAuth = async () => {
	const user = await getProfileFetch(true)

	return user.isSuccess
}
