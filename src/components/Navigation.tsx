import { NavLink } from 'react-router-dom'
import { useCartStore } from '@/store/useCartStore'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

const Navigation: React.FC = () => {
  const cartItems = useCartStore((state) => state.items)
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <nav className="p-4 bg-slate-900">
      <ul className="flex space-x-6">
        <li>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              cn(
                'flex items-center h-9 px-3 text-slate-200 transition-all duration-200',
                'hover:text-white hover:bg-slate-800 rounded-md',
                isActive && 'bg-slate-800 text-white font-medium rounded-md'
              )
            }
          >
            Products
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/checkout"
            className={({ isActive }) =>
              cn(
                'flex items-center h-9 px-3 text-slate-200 transition-all duration-200',
                'hover:text-white hover:bg-slate-800 rounded-md',
                isActive && 'bg-slate-800 text-white font-medium rounded-md'
              )
            }
          >
            <span>Shopping Cart</span>
            {itemCount > 0 && (
              <Badge className="ml-2 bg-blue-500 rounded-full">
                {itemCount}
              </Badge>
            )}
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
