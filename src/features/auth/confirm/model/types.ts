export type ConfirmRegisterProps = {
	searchParams: Promise<{ [key: string]: string | undefined }>
}

export type ConfirmRegisterFetchResponse = {
	data?: any | string
	isSuccess: boolean
}
