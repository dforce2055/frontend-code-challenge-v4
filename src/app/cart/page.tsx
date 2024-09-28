'use client'

import { useCartStore } from '../../store/cartStore'
import Header from '../../components/Header'
import Link from 'next/link'

export default function CartPage() {
  const { items } = useCartStore()

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className=''>
      <Header onSearch={() => { }} />
      <div className="flex flex-col h-screen mx-auto items-center p-4 w-9/12">
        <h1 className="text-2xl text-gray-800 font-normal my-6 text-left w-9/12">Tu Carrito</h1>
        <div className="bg-white rounded-lg p-10 mb-6 w-9/12 text-gray-800">
          {items.map(item => (
            <div key={item.id} className="flex justify-between items-center border-b py-2">
              <div className="flex items-center">
                <span className="font-bold mr-2">{item.quantity}</span>
                <span>{item.name}</span>
              </div>
              <span>USD {(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="mt-4 text-right">
            <p className="font-bold">Total: USD {total.toFixed(2)}</p>
          </div>
        </div>
        <div className="mt-6 text-center">
          <Link href="/" className="bg-indigo-400 text-white px-6 py-4 rounded-lg hover:bg-indigo-500 transition-colors duration-300 ease-in-out shadow-md uppercase">
            Seguir Comprando
          </Link>
        </div>
      </div>
    </div>
  )
}