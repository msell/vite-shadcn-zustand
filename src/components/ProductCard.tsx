import { type FC } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { type Product } from '@/types/Product'
import { useCartStore } from '@/store/useCartStore'

interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
}

export const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const addItem = useCartStore((state) => state.addItem)
  const { title, description, price, filename } = product
  const imageUrl = `/images/${filename}`
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)

  return (
    <Card className="w-[350px] overflow-hidden">
      <div className="h-[200px] overflow-hidden">
        <img
          src={imageUrl}
          alt={description}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex items-center justify-between">
        <p className="text-2xl font-bold text-primary">{formattedPrice}</p>
        <Button onClick={() => addItem(product)} variant="default">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
