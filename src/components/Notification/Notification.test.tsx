import { renderHook, act } from '@testing-library/react'
import { useNotificationStore } from '../../store'

describe('notificationStore', () => {
  it('should add a notification', () => {
    const { result } = renderHook(() => useNotificationStore())

    act(() => {
      result.current.addNotification({ message: 'Test notification', type: 'success' })
    })

    expect(result.current.notifications).toHaveLength(1)
    expect(result.current.notifications[0].message).toBe('Test notification')
    expect(result.current.notifications[0].type).toBe('success')
  })

  it('should remove a notification', () => {
    const { result } = renderHook(() => useNotificationStore())

    act(() => {
      result.current.addNotification({ message: 'Test notification', type: 'success' })
    })

    const notificationId = result.current.notifications[0].id

    act(() => {
      result.current.removeNotification(notificationId)
    })

    expect(result.current.notifications).toHaveLength(1)
  })

  it('should clear all notifications', () => {
    const { result } = renderHook(() => useNotificationStore())

    act(() => {
      result.current.addNotification({ message: 'Test 1', type: 'success' })
      result.current.addNotification({ message: 'Test 2', type: 'error' })
    })

    expect(result.current.notifications).toHaveLength(3)

    act(() => {
      result.current.clearNotifications()
    })

    expect(result.current.notifications).toHaveLength(0)
  })
})