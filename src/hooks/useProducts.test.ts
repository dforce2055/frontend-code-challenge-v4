import { renderHook, act } from '@testing-library/react'
import { useProducts } from './useProducts'

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([{ id: 1, title: 'Test Product' }]),
  })
) as jest.Mock

describe('useProducts', () => {
  it('should fetch products', async () => {
    const { result } = renderHook(() => useProducts())

    expect(result.current.loading).toBe(true)
    expect(result.current.products).toEqual([])

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    expect(result.current.loading).toBe(true)
    expect(result.current.products).toEqual([{ id: 1, title: 'Test Product' }])
  })

  it('should handle load more', async () => {
    const { result } = renderHook(() => useProducts())

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    act(() => {
      result.current.loadMore()
    })

    expect(result.current.loading).toBe(true)

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    expect(result.current.loading).toBe(true)
    expect(fetch).toHaveBeenCalledTimes(3)
  })

  it('should handle error', async () => {
    global.fetch = jest.fn(() => Promise.reject('API error'))

    const { result } = renderHook(() => useProducts())

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    expect(result.current.error).toBe('There was a problem loading the products')
    expect(result.current.products).toEqual([])
  })
})