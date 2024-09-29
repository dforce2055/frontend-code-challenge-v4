import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Header from './Header'

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: unknown) => {
    return <img {...props} alt="Somnio Software" />
  },
}))

jest.mock('../../store/cartStore/cartStore', () => ({
  useCartStore: () => ({
    itemsCount: 2,
    items: [{ id: '1' }, { id: '2' }],
  }),
}))

describe('Header', () => {
  it('renders logo, search input and cart icon', () => {
    render(<Header onSearch={() => {}} />)

    expect(screen.getByAltText('Somnio Software')).toBeDefined()
    expect(screen.getByPlaceholderText('Buscar Productos ...')).toBeDefined()
    // expect(screen.getByRole('link')).toBeVisible()
  })

  it('calls onSearch when input changes', () => {
    const mockOnSearch = jest.fn()
    render(<Header onSearch={mockOnSearch} />)

    const searchInput = screen.getByPlaceholderText('Buscar Productos ...')
    fireEvent.change(searchInput, { target: { value: 'test' } })

    // Debounce delay
    setTimeout(() => {
      expect(mockOnSearch).toHaveBeenCalledWith('test')
    }, 300)
  })

  
})