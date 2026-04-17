import { NextRequest, NextResponse } from 'next/server'
import { getServerProfileFetch } from './entities/user/api/get-server-profile-fetch'

export async function proxy(request: NextRequest) {
	const token = request.cookies.get('access_token')?.value

	if (!token) return NextResponse.redirect(new URL('/', request.url))

	const res = await getServerProfileFetch(token)

	if (!res.isSuccess) return NextResponse.redirect(new URL('/', request.url))
}

export const config = {
	matcher: ['/profile/:path*']
}
