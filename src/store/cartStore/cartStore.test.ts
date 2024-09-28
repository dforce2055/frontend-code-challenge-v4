import { renderHook, act } from '@testing-library/react'
import { useCartStore } from './cartStore'

describe('cartStore', () => {
  it('should add an item to the cart', () => {
    const { result } = renderHook(() => useCartStore())

    act(() => {
      result.current.addItem({ id: '1', name: 'Test Product', price: 10 })
    })

    expect(result.current.items).toHaveLength(1)
    expect(result.current.itemsCount).toBe(1)
  })

  it('should increase quantity when adding existing item', () => {
    const { result } = renderHook(() => useCartStore())

    act(() => {
      result.current.addItem({ id: '1', name: 'Test Product', price: 10 })
      result.current.addItem({ id: '1', name: 'Test Product', price: 10 })
    })

    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].quantity).toBe(3)
    expect(result.current.itemsCount).toBe(3)
  })

  it('should remove an item from the cart', () => {
    const { result } = renderHook(() => useCartStore())

    act(() => {
      result.current.addItem({ id: '1', name: 'Test Product', price: 10 })
      result.current.removeItem('1')
    })

    expect(result.current.items).toHaveLength(0)
    expect(result.current.itemsCount).toBe(0)
  })

  it('should clear the cart', () => {
    const { result } = renderHook(() => useCartStore())

    act(() => {
      result.current.addItem({ id: '1', name: 'Test Product', price: 10 })
      result.current.addItem({ id: '2', name: 'Another Product', price: 20 })
      result.current.clearCart()
    })

    expect(result.current.items).toHaveLength(0)
    expect(result.current.itemsCount).toBe(0)
  })
})