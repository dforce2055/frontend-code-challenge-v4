import Image from 'next/image'
import { useCartStore } from '../../store/cartStore/cartStore'
import { PlusIcon } from '@heroicons/react/24/solid'

interface ProductCardProps {
  id: number
  title: string
  price: number
  description: string
  category: string | CATEGORY
  image: string
  rating: {
    rate: number
    count: number
  }
}

enum CATEGORY {
  ELECTRONICS = "electronics",
  JEWELERY = "jewelery",
  MEN_S_CLOTHING = "men's clothing",
  WOMEN_S_CLOTHING = "women's clothing"
}

export default function ProductCard({ id, image, title, description, price, category }: ProductCardProps) {
  const { addItem } = useCartStore()

  const handleAddToCart = () => {
    addItem({ id, name: title, price, quantity: 1 })
  }

  const getCategoryColor = (category: CATEGORY | string) => {
    switch (category) {
      case CATEGORY.ELECTRONICS:
        return 'bg-blue-500'
      case CATEGORY.JEWELERY:
        return 'bg-yellow-500'
      case CATEGORY.MEN_S_CLOTHING:
        return 'bg-green-500'
      case CATEGORY.WOMEN_S_CLOTHING:
        return 'bg-red-500'
      default:
        return 'bg-white'
    }
  }


  return (
    <div className="bg-white h-[496px] max-w-sm rounded-xl overflow-hidden shadow-lg hover:shadow-sm transition-shadow duration-300 ease-in-out group">
      <div className="relative h-72">
        <Image
          className='w-full h-full object-cover group-hover:scale-105 group-hover:opacity-90 transition-transform duration-300'
          src={image}
          alt={title}
          width={100}
          height={100}
        />

        <button 
          className='absolute top-5 left-5 m-2 bg-white p-2 border border-gray-700 group'
          onClick={handleAddToCart}
        >
          <PlusIcon className='w-6 h-6 text-gray-800 group-hover:text-gray-900 transition-colors duration-300 ease-in-out' />
        </button>
        <div
          className={
            `absolute bottom-5 right-5 m-2 p-2 transition-colors duration-300 ease-in-out shadow-md group
            ${ getCategoryColor(category) }`
          }
        >
          <span className='text-gray-600 font-extrabold text-lg'>USD {price.toFixed(2)}</span>
        </div>
      </div>
      <div className="px-6 py-4">
        <div className="text-gray-900 font-normal text-xl mb-2 line-clamp-2 h-14">{title}</div>
        <p className="text-gray-500 text-base mb-2 h-22 overflow-hidden line-clamp-4">{description}</p>
      </div>
    </div>
  )
}