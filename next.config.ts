import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	async rewrites() {
		return [
			{
				// Все запросы с фронта на /api/... пойдут на твой сервер
				source: '/api/:path*',
				// Важно: если в переменной уже есть /api, здесь его не дублируй
				destination: `https://donation-server-6j13.onrender.com/api/:path*`
			}
		]
	}
}

export default nextConfig
