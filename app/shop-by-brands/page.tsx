'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';
import Link from 'next/link';

interface Brand {
  name: string;
  product_count: number;
}

export default function ShopByBrands() {
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function fetchBrandsFromProducts() {
      try {
        setLoading(true);
        setError('');

        // Fetch all unique brands and their counts from products table
        const { data, error: fetchError } = await supabase
          .from('products')
          .select('brand')
          .not('brand', 'is', null)
          .not('brand', 'eq', '');

        if (fetchError) {
          console.error('Error fetching products:', fetchError);
          throw new Error(fetchError.message);
        }

        if (!data || data.length === 0) {
          setBrands([]);
          return;
        }

        // Count products for each brand
        const brandCounts: { [key: string]: number } = {};
        data.forEach(product => {
          if (product.brand) {
            brandCounts[product.brand] = (brandCounts[product.brand] || 0) + 1;
          }
        });

        // Convert to array of brand objects
        const brandArray = Object.entries(brandCounts).map(([name, count]) => ({
          name,
          product_count: count
        }));

        setBrands(brandArray);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
        console.error('Error fetching brands:', errorMessage);
        setError(`Failed to load brands: ${errorMessage}`);
      } finally {
        setLoading(false);
      }
    }

    fetchBrandsFromProducts();
  }, [supabase]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading brands...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  if (brands.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Brands Available</h2>
          <p className="text-gray-600">No products with brand information have been added yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Brands Sidebar */}
          <div className="w-full md:w-1/4 lg:w-1/5">
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Brands</h2>
              <div className="space-y-2">
                {brands.map((brand) => (
                  <button
                    key={brand.name}
                    onClick={() => setSelectedBrand(brand.name === selectedBrand ? '' : brand.name)}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      selectedBrand === brand.name
                        ? 'bg-red-600 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {brand.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="w-full md:w-3/4 lg:w-4/5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {brands
                .filter(brand => !selectedBrand || brand.name === selectedBrand)
                .map((brand) => (
                  <div
                    key={brand.name}
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="relative h-48">
                      <Image
                        src="/placeholder.jpg"
                        alt={brand.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900">{brand.name}</h3>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {brand.product_count} Products
                        </span>
                        <Link
                          href={`/brands/${brand.name.toLowerCase().replace(/\s+/g, '-')}`}
                          className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-700"
                        >
                          View Products
                          <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {selectedBrand && brands.filter(brand => brand.name === selectedBrand).length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900">No products found</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Try selecting a different brand
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
