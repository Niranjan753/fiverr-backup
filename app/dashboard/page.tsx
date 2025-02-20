'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { supabase } from '../../lib/supabase';
import { v4 as uuidv4 } from 'uuid';

interface Product {
  name: string;
  price: number;
  description: string;
  image_url: string;
  category_id: string;
  brand?: string;
  image?: File | null;
}

export default function Dashboard() {
  const router = useRouter();
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    activeVisitors: 0,
    totalSales: 0
  });
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    price: 0,
    description: '',
    image_url: '',
    category_id: '',
    brand: ''
  });

  useEffect(() => {
    const auth = Cookies.get('auth');
    if (!auth) {
      router.push('/login');
    }
    fetchStats();
  }, [router]);

  const fetchStats = async () => {
    try {
      // Fetch total products
      const { count: productsCount } = await supabase
        .from('products')
        .select('*', { count: 'exact' });

      // Fetch unique categories count
      const { data: categories } = await supabase
        .from('products')
        .select('category');
      
      const uniqueCategories = new Set(categories?.map(item => item.category));

      // For demo purposes - replace with actual analytics
      const mockActiveVisitors = Math.floor(Math.random() * 100);
      const mockTotalSales = Math.floor(Math.random() * 1000000);

      setStats({
        totalProducts: productsCount || 0,
        totalCategories: uniqueCategories.size,
        activeVisitors: mockActiveVisitors,
        totalSales: mockTotalSales
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewProduct(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Validate form data
      if (!newProduct.name || !newProduct.description || !newProduct.price || !newProduct.category_id) {
        throw new Error('All fields are required');
      }

      if (!newProduct.image) {
        throw new Error('Please select an image');
      }

      // Log the form data for debugging
      console.log('Form Data:', {
        ...newProduct,
        image: newProduct.image ? {
          name: newProduct.image.name,
          size: newProduct.image.size,
          type: newProduct.image.type
        } : null
      });

      // Upload image to storage
      const fileExt = newProduct.image.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = fileName;

      console.log('Attempting file upload...', {
        fileName,
        filePath,
        fileType: newProduct.image.type,
        fileSize: newProduct.image.size
      });

      // Upload to the 'products' bucket
      const { error: uploadError, data: uploadData } = await supabase.storage
        .from('products')
        .upload(filePath, newProduct.image, {
          cacheControl: '3600',
          upsert: true,
          contentType: newProduct.image.type
        });

      if (uploadError) {
        console.error('Error uploading file:', uploadError);
        throw new Error(`Failed to upload file: ${uploadError.message}`);
      }

      console.log('Upload successful:', uploadData);

      // Get public URL - using the correct path format
      const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/products/${filePath}`;
      console.log('Generated public URL:', imageUrl);

      // Prepare and insert product data
      const productData = {
        name: newProduct.name,
        description: newProduct.description,
        price: parseFloat((newProduct.price || 0).toString()),
        category: newProduct.category_id,
        image_url: imageUrl
      };

      console.log('Inserting product data:', productData);

      const { error: insertError, data: insertData } = await supabase
        .from('products')
        .insert([productData])
        .select()
        .single();

      if (insertError) {
        console.error('Product insert error:', insertError);
        throw new Error(`Failed to add product: ${insertError.message}`);
      }

      console.log('Product inserted successfully:', insertData);

      setMessage({ type: 'success', text: 'Product added successfully!' });
      setNewProduct({
        name: '',
        description: '',
        price: 0,
        category_id: '',
        image: null
      });
      setImagePreview(null);
      fetchStats(); // Refresh stats after adding product
    } catch (error: unknown) {
      console.error('Detailed Error:', {
        error,
        name: error instanceof Error ? error.name : 'Unknown',
        message: error instanceof Error ? error.message : 'An unexpected error occurred',
        stack: error instanceof Error ? error.stack : 'No stack trace',
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL
      });
      
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'An unexpected error occurred while adding the product. Please try again.';
      
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Cookies.remove('auth');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold text-red-600">SRT Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowAddProduct(!showAddProduct)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-all duration-300"
              >
                {showAddProduct ? 'Hide Form' : 'Add Product'}
              </button>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-600 bg-red-50 hover:bg-red-100 transition-all duration-300"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-600">Total Products</h3>
              <span className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </span>
            </div>
            <p className="text-3xl font-bold text-gray-900 mt-4">{stats.totalProducts}</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-600">Categories</h3>
              <span className="p-2 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </span>
            </div>
            <p className="text-3xl font-bold text-gray-900 mt-4">{stats.totalCategories}</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-600">Active Visitors</h3>
              <span className="p-2 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </span>
            </div>
            <p className="text-3xl font-bold text-gray-900 mt-4">{stats.activeVisitors}</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-600">Total Sales</h3>
              <span className="p-2 bg-yellow-100 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
            </div>
            <p className="text-3xl font-bold text-gray-900 mt-4">₹{stats.totalSales.toLocaleString()}</p>
          </div>
        </div>

        {/* Add Product Form */}
        {showAddProduct && (
          <div className="bg-white shadow-lg rounded-xl p-6 mb-8 transition-all duration-300">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Add New Product</h2>
            
            {message.text && (
              <div className={`p-4 rounded-md mb-6 ${
                message.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
              }`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={newProduct.description}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
                <input
                  type="number"
                  name="price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  name="category_id"
                  value={newProduct.category_id}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                >
                  <option value="">Select a category</option>
                  <option value="sparklers">Sparklers</option>
                  <option value="ground_chakkar">Ground Chakkar</option>
                  <option value="aerial_shots">Aerial Shots</option>
                  <option value="fountains">Fountains</option>
                  <option value="rockets">Rockets</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Brand (Optional)</label>
                <input
                  type="text"
                  name="brand"
                  value={newProduct.brand || ''}
                  onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Product Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                  className="mt-1 block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-red-50 file:text-red-700
                    hover:file:bg-red-100"
                />
                {imagePreview && (
                  <div className="mt-2">
                    <div className="relative h-32 w-32">
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Adding Product...' : 'Add Product'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
