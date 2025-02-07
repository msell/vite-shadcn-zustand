import { type FC } from 'react'
import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'

export const EmptyCart: FC = () => {
  const navigate = useNavigate()

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Your Cart is Empty</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4 py-8">
        <ShoppingCart className="w-16 h-16 text-muted-foreground" />
        <p className="text-center text-muted-foreground">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Button onClick={() => navigate('/products')}>Continue Shopping</Button>
      </CardContent>
    </Card>
  )
}
