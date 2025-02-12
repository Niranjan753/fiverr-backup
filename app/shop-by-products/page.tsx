'use client';

import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { Product } from '../types/product';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../context/CartContext';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface Category {
    id: string;
    name: string;
    slug: string;
}

export default function ShopByProducts() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const [categoriesError, setCategoriesError] = useState('');
    const { products, loading, error } = useProducts(selectedCategory);
    const { addToCart } = useCart();
    const supabase = createClientComponentClient();

    useEffect(() => {
        async function fetchCategories() {
            try {
                setCategoriesLoading(true);
                setCategoriesError('');

                const { data, error: supabaseError } = await supabase
                    .from('categories')
                    .select('*')
                    .order('name');

                if (supabaseError) throw supabaseError;

                if (data) {
                    setCategories(data);
                }
            } catch (err) {
                console.error('Error fetching categories:', err);
                setCategoriesError('Failed to load categories');
            } finally {
                setCategoriesLoading(false);
            }
        }

        fetchCategories();
    }, [supabase]);

    const handleProductClick = (product: Product) => {
        setSelectedProduct(product);
        setQuantity(1);
    };

    if (categoriesLoading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-2xl text-gray-600">Loading categories...</div>
            </div>
        );
    }

    if (categoriesError) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-xl text-red-600">{categoriesError}</div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-white">
            <section className="py-8">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Categories Sidebar */}
                        <div className="w-full md:w-1/4 lg:w-1/5">
                            <div className="bg-white border rounded-lg p-4 md:sticky md:top-24">
                                <h2 className="text-lg font-bold mb-4 text-gray-900">Categories</h2>
                                <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
                                    {categories.map((category) => (
                                        <button
                                            key={category.id}
                                            onClick={() => setSelectedCategory(category.slug)}
                                            className={`w-full text-left px-3 py-2 rounded-md transition-colors text-sm md:text-base ${
                                                selectedCategory === category.slug
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

                        {/* Products Grid */}
                        <div className="w-full md:w-3/4 lg:w-4/5">
                            {loading ? (
                                <div className="flex items-center justify-center h-64">
                                    <div className="text-2xl text-gray-600">Loading products...</div>
                                </div>
                            ) : error ? (
                                <div className="text-center py-12">
                                    <h3 className="text-lg font-medium text-red-600">Error loading products</h3>
                                    <p className="mt-2 text-sm text-gray-500">{error}</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                                    {products.map((product) => (
                                        <ProductCard
                                            key={product.id}
                                            {...product}
                                            onClick={() => handleProductClick(product)}
                                            className="h-full"
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Empty State */}
                            {!loading && !error && products.length === 0 && (
                                <div className="text-center py-12">
                                    <h3 className="text-lg font-medium text-gray-900">No products found</h3>
                                    <p className="mt-2 text-sm text-gray-500">
                                        {selectedCategory 
                                            ? 'Try selecting a different category'
                                            : 'Please select a category to view products'
                                        }
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Product Modal */}
            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    isOpen={selectedProduct !== null}
                    onClose={() => setSelectedProduct(null)}
                    onAddToCart={() => {
                        addToCart(selectedProduct, quantity);
                        setSelectedProduct(null);
                        setQuantity(1);
                    }}
                    quantity={quantity}
                    onQuantityChange={setQuantity}
                />
            )}
        </main>
    );
}