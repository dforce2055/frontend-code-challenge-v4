'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import { useProducts } from '../hooks/useProducts'
import { EyeIcon } from '@heroicons/react/24/solid'
import { Transition } from '@headlessui/react'

import ProductCard from '../components/ProductCard'
import Header from '../components/Header'
import Notification from '../components/Notification'
import LoadingOverlay from '../components/LoadingOverlay'

export default function Home() {
  const lastProductRef = useRef<HTMLDivElement>(null)
  const moreButtonRef = useRef<HTMLButtonElement>(null)

  const { products, loading, hasMore, loadMore } = useProducts()
  const [searchTerm, setSearchTerm] = useState('')
  const [showProducts, setShowProducts] = useState(false)
  const [firstLoad, setFirstLoad] = useState(true)

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products
    return products.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [products, searchTerm])

  const handleSearch = (term: string) => {
    setSearchTerm(term)
  }

  const handleLoadMore = () => {
    loadMore()
  }

  // show the products when the loading is false
  useEffect(() => {
    if (!loading) setShowProducts(true)
  }, [loading])
  
  // scroll to the last product when the products array changes
  useEffect(() => {
    if (moreButtonRef.current && products.length > 0) {
      moreButtonRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [products])

  useEffect(() => {
    if (showProducts) setFirstLoad(false)
  }, [showProducts])


  return (
    <>
      <LoadingOverlay isLoading={loading && firstLoad} />
      <Header onSearch={handleSearch} />
      <div className="flex flex-col h-full mx-auto items-center p-4 mb-12">
        <Transition show={showProducts}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 mt-4">
          {filteredProducts.map((product, index) => (
              <div key={product.id} ref={index === filteredProducts.length - 1 ? lastProductRef : null}>
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        </Transition>

        {hasMore && (
          <button 
            onClick={handleLoadMore}
            ref={moreButtonRef}
            className={
              `bg-white border border-gray-200 hover:bg-gray-300 text-gray-600 transition-colors duration-300 ease-in-out font-bold py-2 px-4 rounded-xl flex items-center justify-center gap-4 w-80 h-12 mt-16
              ${loading ? 'opacity-90 cursor-not-allowed animate-pulse' : 'hover:bg-indigo-100'}`}
            disabled={loading}
          >
            <EyeIcon aria-hidden="true" className="h-5 w-5" />
            <span className='uppercase w-28'>{loading ? 'Loading...' : 'Ver más'}</span>
          </button>
        )}

      </div>
      <Notification />
    </>
  )
}