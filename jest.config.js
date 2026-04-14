module.exports = {
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.(t|j)sx?$': 'babel-jest'
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
	setupFilesAfterEnv: ['<rootDir>/src/shared/utils/tests/model/setupTests.tsx'],
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
		// Заглушка для useRouter
		'^next/navigation$': '<rootDir>/__mocks__/next/navigation.ts',
		// Заглушка для <Link />
		'^next/link$': '<rootDir>/__mocks__/next/link.tsx',
		// Заглушка для стилей
		'\\.(css|less|scss|sass)$': 'identity-obj-proxy',
		// Заглушка для картинок и SVG
		'\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.ts'
	},
	testPathIgnorePatterns: ['<rootDir>/src/app/']
}
