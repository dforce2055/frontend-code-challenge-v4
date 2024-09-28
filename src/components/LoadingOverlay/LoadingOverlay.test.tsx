import React from 'react'
import { render, screen } from '@testing-library/react'
import LoadingOverlay from './LoadingOverlay'

describe('LoadingOverlay', () => {
  it('renders loading message when isLoading is true', () => {
    render(<LoadingOverlay isLoading={true} />)

    expect(screen.getByText('Loading...')).toBeDefined()
  })

  it('does not render loading message when isLoading is false', () => {
    render(<LoadingOverlay isLoading={false} />)

    expect(screen.queryByText('Loading...')).toBeNull()
  })
})