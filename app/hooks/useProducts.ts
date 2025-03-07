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
          .select('*')
          .eq('is_visible', true);

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
          category_id: product.category_id,
          image_url: product.image_url || '',
          is_visible: product.is_visible,
          stock_status: product.stock_status || 'in_stock',
          updated_at: product.updated_at
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