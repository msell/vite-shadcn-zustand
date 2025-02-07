import { Product } from '@/types/Product'
import { useEffect, useState } from 'react'

export default function useFetchProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products.json')
        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }
        const data = await response.json()
        /* the products in the data are missing the id field,
        so we need to add it so that we can use it for our keys.
        Really we need to fix this in the api, but for the scope of this exercise
        I'm just going to add set the id to the filename since it is unique */
        const productsWithIds = data.map((product: Product) => ({
          ...product,
          id: product.filename,
        }))
        setProducts(productsWithIds)
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to fetch products'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return { products, loading, error }
}
