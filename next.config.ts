import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: `https://donation-server-6j13.onrender.com/api/:path*`
			}
		]
	}
}

export default nextConfig
