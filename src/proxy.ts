import { NextRequest, NextResponse } from 'next/server'
import { getServerProfileFetch } from './entities/user/api/get-server-profile-fetch'

export async function proxy(request: NextRequest) {
	const token = request.cookies.get('access_token')?.value
	const url = request.nextUrl.pathname

	if (!token) {
		if (url.startsWith('/profile'))
			return NextResponse.redirect(new URL('/', request.url))

		return NextResponse.next()
	}
	try {
		const res = await getServerProfileFetch(token)

		if (res.isSuccess) {
			if (url.startsWith('/auth') && !url.startsWith('/auth/confirm'))
				return NextResponse.redirect(new URL('/profile', request.url))
		} else {
			if (url.startsWith('/profile'))
				return NextResponse.redirect(new URL('/', request.url))
		}
	} catch (e) {
		if (url.startsWith('auth'))
			return NextResponse.redirect(new URL('/profile', request.url))
	}
}

export const config = {
	matcher: ['/profile/:path*', '/auth/:path*']
}
