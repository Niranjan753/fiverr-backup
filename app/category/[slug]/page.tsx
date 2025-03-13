'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Product } from '@/app/types/product';
import CategoryPage from '@/app/components/CategoryPage';
import { useParams } from 'next/navigation';

const categoryDescriptions: Record<string, string> = {
  'ground-chakkar': 'Experience the mesmerizing display of our Ground Chakkar collection, featuring spinning fireworks that create beautiful patterns on the ground.',
  'flower-pots': 'Discover our vibrant Flower Pots collection, offering spectacular aerial displays that bloom like colorful flowers in the night sky.',
  'rockets': 'Explore our exciting range of Rockets that soar high into the sky before bursting into brilliant colors and effects.',
  'single-sound': 'Browse our Single Sound Crackers collection for traditional crackers that deliver a satisfying bang.',
  'sparklers': 'Light up your celebrations with our Sparklers collection, perfect for creating magical moments with family and friends.',
  'sky-shots': 'Experience the grandeur of our Sky Shots collection, featuring aerial fireworks that paint the sky with stunning colors and patterns.',
  'fountains': 'Enjoy our Fountains collection, offering continuous sprays of sparks and colors that create beautiful visual displays.',
  'repeating-shots': 'Check out our Repeating Shots collection for multiple-effect aerial fireworks that deliver spectacular shows.'
};

const categoryTitles: Record<string, string> = {
  'ground-chakkar': 'Ground Chakkar Collection',
  'flower-pots': 'Flower Pots Collection',
  'rockets': 'Rockets Collection',
  'single-sound': 'Single Sound Crackers',
  'sparklers': 'Sparklers Collection',
  'sky-shots': 'Sky Shots Collection',
  'fountains': 'Fountains Collection',
  'repeating-shots': 'Repeating Shots Collection'
};

export default function CategoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const slug = params.slug as string;

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*, categories(name)')
          .eq('category_id', slug)
          .eq('is_visible', true);

        if (error) throw error;

        setProducts(data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <CategoryPage
      title={categoryTitles[slug] || 'Products'}
      description={categoryDescriptions[slug] || 'Explore our collection of quality products.'}
      products={products}
    />
  );
} 