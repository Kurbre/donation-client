import { NextRequest, NextResponse } from 'next/server'
import { getServerProfileFetch } from './entities/user/api/get-server-profile-fetch'

export async function proxy(request: NextRequest) {
	const token = request.cookies.get('access_token')?.value

	if (!token) {
		if (request.nextUrl.pathname.startsWith('/profile'))
			return NextResponse.redirect(new URL('/', request.url))

		return NextResponse.next()
	}
	try {
		const res = await getServerProfileFetch(token)

		if (res.isSuccess) {
			if (request.nextUrl.pathname.startsWith('/auth'))
				return NextResponse.redirect(new URL('/profile', request.url))
		} else {
			if (request.nextUrl.pathname.startsWith('/profile'))
				return NextResponse.redirect(new URL('/', request.url))
		}
	} catch (e) {
		if (request.nextUrl.pathname.startsWith('auth'))
			return NextResponse.redirect(new URL('/profile', request.url))
	}
}

export const config = {
	matcher: ['/profile/:path*', '/auth/:path*']
}
