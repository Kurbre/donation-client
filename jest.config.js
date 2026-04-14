module.exports = {
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.(t|j)sx?$': 'babel-jest'
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
	setupFilesAfterEnv: ['<rootDir>/src/shared/utils/tests/model/setupTests.tsx'],
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
		'^next/navigation$': '<rootDir>/__mocks__/next/navigation.ts',
		'^next/link$': '<rootDir>/__mocks__/next/link.tsx'
	},
	testPathIgnorePatterns: ['<rootDir>/src/app/']
}
