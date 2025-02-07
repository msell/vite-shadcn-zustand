import { type FC } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { useCartStore } from '@/store/useCartStore'
import { MinusIcon, PlusIcon, TrashIcon } from 'lucide-react'
import { EmptyCart } from './EmptyCart'

export const CartSummary: FC = () => {
  const { items, totalItems, totalPrice, removeItem, updateQuantity } =
    useCartStore()

  if (items.length === 0) {
    return <EmptyCart />
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex justify-between">
          Shopping Cart
          <span className="text-muted-foreground">({totalItems} items)</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          {items.map((item) => (
            <div key={item.product.id}>
              <div className="flex gap-4 py-4">
                <div className="w-[80px] h-[80px] overflow-hidden rounded-md">
                  <img
                    src={`/images/${item.product.filename}`}
                    alt={item.product.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{item.product.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    ${item.product.price.toFixed(2)}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="w-8 h-8"
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                    >
                      <MinusIcon className="w-4 h-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="w-8 h-8"
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                    >
                      <PlusIcon className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8 ml-auto text-destructive"
                      onClick={() => removeItem(item.product.id)}
                    >
                      <TrashIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
              <Separator />
            </div>
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <div className="flex justify-between w-full text-lg font-semibold">
          <span>Total</span>
          <span>${totalPrice?.toFixed(2)}</span>
        </div>
        <Button className="w-full" size="lg">
          Proceed to Checkout
        </Button>
      </CardFooter>
    </Card>
  )
}
