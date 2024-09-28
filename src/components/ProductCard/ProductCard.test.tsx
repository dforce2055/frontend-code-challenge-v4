/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { render, screen } from '@testing-library/react'
import ProductCard from './ProductCard'

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: unknown) => {
    return <img {...props} alt="Test Product" />
  },
}))

describe('ProductCard', () => {
  const mockProduct = {
    id: '1',
    image: '/test-image.jpg',
    title: 'Test Product',
    description: 'This is a test product',
    price: 9.99,
  }

  it('renders product information correctly', () => {
    render(<ProductCard category={''} {...mockProduct} />)

    expect(screen.getByAltText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('Test Product')).toBeDefined()
    expect(screen.getByText('This is a test product')).toBeDefined()
    expect(screen.getByText('USD 9.99')).toBeDefined()
    expect(screen.getByRole('button')).toBeDefined()
  })
})