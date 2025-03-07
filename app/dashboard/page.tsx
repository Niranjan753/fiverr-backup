'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaEdit, FaTrash, FaEye, FaEyeSlash } from 'react-icons/fa';
import { supabase } from '@/lib/supabase';
import { Product, Category } from '@/types/database';
import { toast } from 'react-hot-toast';

export default function Dashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'products' | 'categories'>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    price: 0,
    description: '',
    image_url: '',
    category_id: '',
    is_visible: true,
    stock_status: 'in_stock'
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*, categories(name)')
        .order('name');

      if (productsError) {
        toast.error('Error fetching products: ' + productsError.message);
        return;
      }
      setProducts(productsData);

      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (categoriesError) {
        toast.error('Error fetching categories: ' + categoriesError.message);
        return;
      }
      setCategories(categoriesData);
    } catch (error) {
      toast.error('Unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([newProduct])
        .select()
        .single();

      if (error) throw error;

      setProducts([...products, data]);
      setNewProduct({
        name: '',
        price: 0,
        description: '',
        image_url: '',
        category_id: '',
        is_visible: true,
        stock_status: 'in_stock'
      });
      toast.success('Product added successfully!');
    } catch (error) {
      toast.error('Error adding product: ' + error.message);
    }
  };

  const handleEditProduct = async (product: Product) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .update({
          ...product,
          updated_at: new Date().toISOString()
        })
        .eq('id', product.id)
        .select()
        .single();

      if (error) throw error;

      setProducts(products.map(p => (p.id === product.id ? data : p)));
      setEditingProduct(null);
      toast.success('Product updated successfully!');
    } catch (error) {
      toast.error('Error updating product: ' + error.message);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setProducts(products.filter(product => product.id !== id));
      toast.success('Product deleted successfully!');
    } catch (error) {
      toast.error('Error deleting product: ' + error.message);
    }
  };

  const toggleVisibility = async (product: Product) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .update({ is_visible: !product.is_visible })
        .eq('id', product.id)
        .select()
        .single();

      if (error) throw error;

      setProducts(products.map(p => (p.id === product.id ? data : p)));
      toast.success(`Product ${data.is_visible ? 'shown' : 'hidden'} successfully!`);
    } catch (error) {
      toast.error('Error updating visibility: ' + error.message);
    }
  };

  const updateStockStatus = async (product: Product, status: 'in_stock' | 'out_of_stock') => {
    try {
      const { data, error } = await supabase
        .from('products')
        .update({ stock_status: status })
        .eq('id', product.id)
        .select()
        .single();

      if (error) throw error;

      setProducts(products.map(p => (p.id === product.id ? data : p)));
      toast.success('Stock status updated successfully!');
    } catch (error) {
      toast.error('Error updating stock status: ' + error.message);
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen">
    <div className="text-xl font-semibold">Loading...</div>
  </div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Product Management Dashboard</h1>
      
      <div className="mb-6">
        <button 
          onClick={() => setActiveTab('products')}
          className={`mr-4 px-4 py-2 rounded ${activeTab === 'products' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Products
        </button>
        <button 
          onClick={() => setActiveTab('categories')}
          className={`px-4 py-2 rounded ${activeTab === 'categories' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Categories
        </button>
      </div>

      {activeTab === 'products' && (
        <div>
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Products List</h2>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visibility</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map(product => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="text"
                        value={product.name}
                        onChange={e => handleEditProduct({ ...product, name: e.target.value })}
                        className="border rounded px-2 py-1 w-full"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        value={product.price}
                        onChange={e => handleEditProduct({ ...product, price: Number(e.target.value) })}
                        className="border rounded px-2 py-1 w-24"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={product.category_id}
                        onChange={e => handleEditProduct({ ...product, category_id: e.target.value })}
                        className="border rounded px-2 py-1"
                      >
                        {categories.map(category => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={product.stock_status}
                        onChange={e => updateStockStatus(product, e.target.value as 'in_stock' | 'out_of_stock')}
                        className="border rounded px-2 py-1"
                      >
                        <option value="in_stock">In Stock</option>
                        <option value="out_of_stock">Out of Stock</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleVisibility(product)}
                        className={`p-2 rounded ${product.is_visible ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}
                      >
                        {product.is_visible ? <FaEye /> : <FaEyeSlash />}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-600 hover:text-red-900 ml-3"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Product Name</label>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price</label>
                  <input
                    type="number"
                    value={newProduct.price}
                    onChange={e => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                    className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={newProduct.description}
                  onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  value={newProduct.category_id}
                  onChange={e => setNewProduct({ ...newProduct, category_id: e.target.value })}
                  className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                <input
                  type="text"
                  value={newProduct.image_url}
                  onChange={e => setNewProduct({ ...newProduct, image_url: e.target.value })}
                  className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}