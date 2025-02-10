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

        if (category) {
          query = query.eq('category', category);
        }

        const { data, error: supabaseError } = await query;

        if (supabaseError) throw supabaseError;

        // Transform the data to match the Product interface
        const transformedProducts: Product[] = data.map(product => {
          const imageUrl = product.image_url || '/placeholder.jpg';
          return {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category,
            image: imageUrl,
            image_url: imageUrl,
            discount: product.discount || 0,
            rating: product.rating || 4.5,
            features: product.features || [],
            specifications: product.specifications || {},
            safetyInstructions: product.safetyInstructions || [],
            stock: product.stock || 0,
            isNew: product.isNew || false,
            created_at: product.created_at
          };
        });

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