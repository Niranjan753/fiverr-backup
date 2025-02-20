'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Product } from '../types/product';

export function useProducts(category?: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);

        let query = supabase
          .from('products')
          .select('*');

        if (category && category !== '') {
          query = query.eq('category', category);
        }

        const { data, error: supabaseError } = await query;

        if (supabaseError) throw supabaseError;

        if (!data) {
          setProducts([]);
          return;
        }

        const transformedProducts: Product[] = data.map(product => ({
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          category: product.category,
          image: product.image_url || '',
          image_url: product.image_url,
          discount: 0,
          rating: 5,
          features: [],
          specifications: {},
          safetyInstructions: [],
          stock: 100,
          isNew: true,
          created_at: product.created_at
        }));

        setProducts(transformedProducts);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err instanceof Error ? err.message : 'An error occurred while fetching products');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [category]);

  return { products, loading, error };
}