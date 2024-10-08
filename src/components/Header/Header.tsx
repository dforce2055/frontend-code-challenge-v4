import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { useCartStore } from '../../store/cartStore/cartStore'
import { debounce } from '../../utils'
import { MagnifyingGlassIcon, ShoppingCartIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import logo from '../../../public/images/logo.svg'

interface HeaderProps {
  onSearch?: (searchTerm: string) => void
}

export default function Header({ onSearch }: HeaderProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const { itemsCount, items } = useCartStore()
  
  const debouncedSearch = useCallback(
    debounce((...args: unknown[]) => {
      if (onSearch && args.length > 0 && typeof args[0] === 'string') {
        onSearch(args[0]);
      }
    }, 300),
    [onSearch]
  );

  useEffect(() => {
    debouncedSearch(searchTerm)
  }, [searchTerm, debouncedSearch])

  return (
    <header className="bg-indigo-200 p-4">
      <div className="container mx-auto flex flex-col gap-6 items-center lg:flex-row lg:justify-between">
        {/* Logo and Cart container for mobile */}
        <div className="w-full flex justify-between items-center lg:w-auto">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image src={logo} alt="Somnio Software" width={150} height={50} />
            </Link>
          </div>

          {/* Cart */}
          <div className="flex-shrink-0 lg:hidden">
            <Link href="/cart" className="relative">
              <ShoppingCartIcon className="w-8 h-8 text-gray-100" />
              {items.length > 0 && (
                <span className="absolute bottom-1 -left-5 bg-gray-300 border-2 border-gray-400 text-gray-800 rounded-full w-6 h-6 flex items-center justify-center text-base font-bold">
                  {itemsCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Search */}
        <div className="w-full relative lg:flex-1 lg:max-w-xl">
          <input
            type="text"
            placeholder="Buscar Productos ..."
            className="w-full px-4 py-2 rounded-3xl focus:outline-none focus:ring focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <MagnifyingGlassIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>

        {/* Cart for desktop */}
        <div className="hidden lg:flex lg:justify-end">
          <Link href="/cart" className="relative">
            <ShoppingCartIcon className="w-12 h-12 text-gray-100" />
            {items.length > 0 && (
              <span className="absolute bottom-1 -left-5 bg-gray-300 border-2 border-gray-400 text-gray-800 rounded-full w-6 h-6 flex items-center justify-center text-base font-bold">
                {itemsCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
}