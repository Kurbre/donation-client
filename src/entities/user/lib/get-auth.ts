import { getServerProfileFetch } from '../api/get-server-profile-fetch'

export const getAuth = async () => {
	const user = await getServerProfileFetch()

	return {
		user: user.data,
		isAuth: !!user.data
	}
}
