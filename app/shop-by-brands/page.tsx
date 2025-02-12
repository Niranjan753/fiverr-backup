'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';
import Link from 'next/link';

const categories = [
    { id: 'featured', name: 'Featured Brands' },
    { id: 'standard', name: 'Standard Fireworks' },
    { id: 'kaliswari', name: 'Sri Kaliswari' },
    { id: 'ayyan', name: 'Ayyan Fireworks' },
    { id: 'coronation', name: 'Coronation' },
    { id: 'sony', name: 'Sony Fireworks' },
    { id: 'cock', name: 'Cock Brand' }
];

interface Brand {
  id: number;
  name: string;
  description: string;
  logo_url: string;
  featured: boolean;
}

export default function ShopByBrands() {
    const [selectedBrand, setSelectedBrand] = useState(categories[0].id);
    const [brands, setBrands] = useState<Brand[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    const supabase = createClientComponentClient();

    useEffect(() => {
        async function fetchBrands() {
            try {
                setLoading(true);
                setError('');

                const { data, error: supabaseError } = await supabase
                    .from('brands')
                    .select('*')
                    .order('name');

                if (supabaseError) throw supabaseError;

                if (data) {
                    setBrands(data);
                }
            } catch (err) {
                console.error('Error fetching brands:', err);
                setError('Failed to load brands');
            } finally {
                setLoading(false);
            }
        }

        fetchBrands();
    }, [supabase]);

    const filteredBrands = selectedBrand === 'featured' 
        ? brands.filter(brand => brand.featured)
        : brands.filter(brand => brand.name.toLowerCase().replace(/\s+/g, '-') === selectedBrand);

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

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Categories Sidebar */}
                    <div className="w-full md:w-1/4 lg:w-1/5">
                        <div className="bg-white rounded-lg shadow p-4">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
                            <div className="space-y-2">
                                {categories.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() => setSelectedBrand(category.id)}
                                        className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                                            selectedBrand === category.id
                                                ? 'bg-red-600 text-white'
                                                : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Brands Grid */}
                    <div className="w-full md:w-3/4 lg:w-4/5">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredBrands.map((brand) => (
                                <div
                                    key={brand.id}
                                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                                >
                                    <div className="relative h-48">
                                        <Image
                                            src={brand.logo_url || '/placeholder.jpg'}
                                            alt={brand.name}
                                            fill
                                            className="object-cover"
                                        />
                                        {brand.featured && (
                                            <div className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm">
                                                Featured
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold text-gray-900">{brand.name}</h3>
                                        <p className="mt-2 text-sm text-gray-600">{brand.description}</p>
                                        <Link
                                            href={`/brands/${brand.name.toLowerCase().replace(/\s+/g, '-')}`}
                                            className="mt-4 inline-flex items-center text-sm font-medium text-red-600 hover:text-red-700"
                                        >
                                            View Products
                                            <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredBrands.length === 0 && (
                            <div className="text-center py-12">
                                <h3 className="text-lg font-medium text-gray-900">No brands found</h3>
                                <p className="mt-2 text-sm text-gray-500">
                                    Try selecting a different category
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
