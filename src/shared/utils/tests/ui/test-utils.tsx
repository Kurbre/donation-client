import React, { PropsWithChildren, ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import Providers from '@/app/providers'

const AllTheProviders = ({ children }: PropsWithChildren) => {
	return <Providers>{children}</Providers>
}

export const customRender = (
	ui: ReactElement,
	options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
