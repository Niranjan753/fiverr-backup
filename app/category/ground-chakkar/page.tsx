"use client";

import { useEffect, useState } from 'react';
import CategoryPage from '../../components/CategoryPage';
import { supabase } from '../../../lib/supabase';
import { Product } from '../../types/product';

export default function GroundChakkarPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('category', 'ground_chakkar');

        if (error) {
          throw error;
        }

        // Transform the data to match the expected format
        const transformedProducts = data.map(product => ({
          ...product,
          image: product.image_url, // For backward compatibility with ProductCard
          discount: 0,
          rating: 4.5,
          features: [],
          specifications: {},
          safetyInstructions: [],
          stock: 50,
          isNew: false
        }));

        setProducts(transformedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading products...</div>
      </div>
    );
  }

  return (
    <CategoryPage
      title="Ground Chakkar Collection"
      description="Explore our range of high-quality ground chakkars with spectacular effects"
      products={products}
    />
  );
}
