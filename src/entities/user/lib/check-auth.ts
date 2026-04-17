import { getServerProfileFetch } from '../api/get-server-profile-fetch'

export const checkAuth = async () => {
	const user = await getServerProfileFetch()

	return user.isSuccess
}
