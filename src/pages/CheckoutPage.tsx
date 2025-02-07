import { type FC } from 'react'
import { CartSummary } from '@/components/CartSummary'

const CheckoutPage: FC = () => {
  return (
    <div className="container py-8">
      <h1 className="mb-8 text-3xl font-bold">Checkout</h1>
      <CartSummary />
    </div>
  )
}

export default CheckoutPage
