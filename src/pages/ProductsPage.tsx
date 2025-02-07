import { type FC } from 'react'
import { ProductCard } from '@/components/ProductCard'
import { type Product } from '@/types/Product'
import useFetchProducts from '@/hooks/useFetchProducts'

const Products: FC = () => {
  const { products, loading, error } = useFetchProducts()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading products...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    )
  }

  // Example handler for adding to cart
  const handleAddToCart = (product: Product) => {
    console.log('Adding to cart:', product)
    // Implement your cart logic here
  }

  return (
    <div className="container py-8 mx-auto">
      <h1 className="mb-8 text-3xl font-bold">Our Products</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div key={product.id} className="mx-auto">
            <ProductCard product={product} onAddToCart={handleAddToCart} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Products
