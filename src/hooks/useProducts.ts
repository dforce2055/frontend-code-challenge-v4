/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useNotificationStore } from '@/store/notificationStore'
import { useState, useEffect, useCallback } from 'react'

interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

export function useProducts(initialLimit = 3) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [limit, setLimit] = useState(initialLimit)
  const [hasMore, setHasMore] = useState(true)
  const { addNotification } = useNotificationStore()

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true)

      const response = await fetch(`https://fakestoreapi.com/products?limit=${limit}`, {
        cache: 'force-cache'
      })

      if (!response.ok) throw new Error('Error getting products')
      const newProducts = await response.json() as Product[]

      setProducts(prevProducts => {
        const existingIds = new Set(prevProducts.map(p => p.id))
        const uniqueNewProducts = newProducts.filter(p => !existingIds.has(p.id))
        return [...prevProducts, ...uniqueNewProducts]
      })

      setHasMore(newProducts.length === limit)
      if (newProducts.length === 20) setHasMore(false)
      
      setError(null)

      // force error
      // throw new Error('Error getting products')
    } catch (_err) {
      setError('There was a problem loading the products')
      addNotification({
        message: 'There was a problem loading the products',
        type: 'error',
      })
      setProducts([])
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }
  }, [limit, addNotification])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])


  const loadMore = () => {
    setLimit(prevLimit => prevLimit + 3)
  }

  return { products, loading, error, refetch: fetchProducts, hasMore, loadMore }
}