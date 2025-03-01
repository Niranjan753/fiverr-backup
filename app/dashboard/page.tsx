'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { supabase } from '../../lib/supabase';
import { v4 as uuidv4 } from 'uuid';

interface Product {
  id: string;
  name: string;
  price: number;
  discount: number;
  image_url: string;
  category_id: string;
  description: string;
  brand?: string;
  image?: File | null;
  isVisible: boolean;
}

interface Category {
  id: string;
  name: string;
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
    id: '',
    name: '',
    price: 0,
    discount: 0,
    image_url: '',
    category_id: '',
    description: '',
    isVisible: true
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isViewingProducts, setIsViewingProducts] = useState(false);

  useEffect(() => {
    const auth = Cookies.get('auth');
    if (!auth) {
      router.push('/login');
    }
    fetchStats();
    fetchProducts();
    fetchCategories();
  }, [router]);

  const fetchStats = async () => {
    try {
      const { count: productsCount } = await supabase
        .from('products')
        .select('*', { count: 'exact' });

      const { data: categories } = await supabase
        .from('products')
        .select('category');

      const uniqueCategories = new Set(categories?.map(item => item.category));

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

  const fetchProducts = async () => {
    const { data, error } = await supabase.from('products').select('*');
    if (error) console.error('Error fetching products:', error);
    else setProducts(data as Product[]);
  };

  const fetchCategories = async () => {
    const { data, error } = await supabase.from('categories').select('*');
    if (error) console.error('Error fetching categories:', error);
    else setCategories(data as Category[]);
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
      if (!newProduct.name || !newProduct.description || !newProduct.price || !newProduct.category_id) {
        throw new Error('All fields are required');
      }

      if (!newProduct.image) {
        throw new Error('Please select an image');
      }

      const fileExt = newProduct.image.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = fileName;

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

      const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/products/${filePath}`;

      const productData = {
        name: newProduct.name,
        description: newProduct.description,
        price: parseFloat((newProduct.price || 0).toString()),
        category: newProduct.category_id,
        image_url: imageUrl
      };

      const { error: insertError, data: insertData } = await supabase
        .from('products')
        .insert([productData])
        .select()
        .single();

      if (insertError) {
        console.error('Product insert error:', insertError);
        throw new Error(`Failed to add product: ${insertError.message}`);
      }

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
      console.error('Detailed Error:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Cookies.remove('auth');
    router.push('/login');
  };

  const handleToggleViewProducts = () => {
    setIsViewingProducts(!isViewingProducts);
  };

  const handleUpdateProduct = async (product: Product) => {
    if (!product.id || !product.name || !product.price) {
        console.error('Missing required fields for product update');
        return;
    }
    const { error, data } = await supabase.from('products').update(product).eq('id', product.id);
    if (error) {
        console.error('Error updating product:', error.message || error);
    } else {
        console.log('Product updated successfully:', data);
        fetchProducts(); // Refresh product list
    }
  };

  const handleSave = async (id: string, updatedValue: string) => {
    const { error } = await supabase
      .from('products')
      .update({ name: updatedValue }) // Adjust the field name as necessary
      .eq('id', id);

    if (error) {
      console.error('Error updating product:', error);
    } else {
      console.log('Product updated successfully');
    }
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
                onClick={handleToggleViewProducts}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-all duration-300"
              >
                {isViewingProducts ? 'Hide Products' : 'View Products'}
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

        {/* Product List Table */}
        {isViewingProducts && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-2">Product List</h2>
            <table className="min-w-full border-collapse border border-gray-200">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2">Show</th>
                  <th className="border border-gray-300 p-2">Name</th>
                  <th className="border border-gray-300 p-2">Price</th>
                  <th className="border border-gray-300 p-2">Discount</th>
                  <th className="border border-gray-300 p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border border-gray-300">
                    <td className="border border-gray-300 p-2"><input type="checkbox" defaultChecked={product.isVisible} onChange={() => handleUpdateProduct({...product, isVisible: !product.isVisible})} /></td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="text"
                        defaultValue={product.name}
                        onBlur={(e) => handleSave(product.id, e.target.value)}
                      />
                    </td>
                    <td className="border border-gray-300 p-2">₹{product.price}</td>
                    <td className="border border-gray-300 p-2">{product.discount}%</td>
                    <td className="border border-gray-300 p-2">
                      <button onClick={() => handleSave(product.id, product.name)} className="bg-yellow-500 text-white px-2 py-1 rounded">Save</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// import AdminDashboard from '../components/AdminDashboard';

// const Dashboard = () => {
//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
//       <AdminDashboard />
//     </div>
//   );
// };

// export default Dashboard; 