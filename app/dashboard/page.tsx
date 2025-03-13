'use client';
import { useState, useEffect } from 'react';
import { FaTrash, FaEye, FaEyeSlash } from 'react-icons/fa';
import { supabase } from '@/lib/supabase';
import { Product } from '@/app/types/product';
import { Category } from '@/types/database';
import { toast } from 'react-hot-toast';

interface DatabaseError {
  message: string;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'products' | 'categories'>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    price: 0,
    description: '',
    image_url: '',
    category_id: '',
    stock_status: 'in_stock',
    is_visible: true,
    updated_at: new Date().toISOString()
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
    } catch (error: unknown) {
      const dbError = error as DatabaseError;
      toast.error('Unexpected error occurred: ' + dbError.message);
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
        .select('*, categories(name)')
        .single();

      if (error) throw error;

      setProducts([...products, {
        ...data,
        category_name: data.categories?.name
      }]);
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
    } catch (error: unknown) {
      const dbError = error as DatabaseError;
      toast.error('Error adding product: ' + dbError.message);
    }
  };

  const handleUpdateProduct = async (product: Product) => {
    try {
      // Prepare the update data with all necessary fields
      const updateData = {
        name: product.name,
        price: product.price,
        description: product.description,
        category_id: product.category_id,
        stock_status: product.stock_status,
        is_visible: product.is_visible,
        image_url: product.image_url,
        updated_at: new Date().toISOString()
      };

      // First verify the product exists
      const { data: existingProduct, error: checkError } = await supabase
        .from('products')
        .select('id')
        .eq('id', product.id)
        .single();

      if (checkError) {
        console.error('Product check error:', checkError);
        throw new Error('Product not found');
      }

      // Then perform the update
      const { data, error } = await supabase
        .from('products')
        .update(updateData)
        .eq('id', product.id)
        .select(`
          id,
          name,
          price,
          description,
          category_id,
          stock_status,
          is_visible,
          image_url,
          updated_at,
          categories (
            name
          )
        `)
        .single();

      if (error) {
        console.error('Update error:', error);
        throw error;
      }

      if (!data) {
        throw new Error('No data returned after update');
      }

      // Update the local state with the returned data
      setProducts(products.map(p => (p.id === product.id ? {
        ...data,
        category_name: data.categories?.name
      } : p)));
      
      toast.success('Product updated successfully!');
    } catch (error: unknown) {
      const dbError = error as DatabaseError;
      toast.error('Error updating product: ' + (dbError.message || 'Unknown error'));
      
      // Refresh the data to ensure consistency
      fetchData();
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      // First verify the product exists
      const { data: existingProduct, error: checkError } = await supabase
        .from('products')
        .select('id')
        .eq('id', id)
        .single();

      if (checkError) {
        console.error('Product check error:', checkError);
        throw new Error('Product not found');
      }

      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setProducts(products.filter(product => product.id !== id));
      toast.success('Product deleted successfully!');
    } catch (error: unknown) {
      const dbError = error as DatabaseError;
      toast.error('Error deleting product: ' + (dbError.message || 'Unknown error'));
      fetchData();
    }
  };

  const toggleVisibility = async (product: Product) => {
    try {
      const updatedProduct = {
        ...product,
        is_visible: !product.is_visible
      };
      await handleUpdateProduct(updatedProduct);
    } catch (error) {
      console.error('Toggle visibility error:', error);
      fetchData();
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen">
    <div className="text-xl font-semibold">Loading...</div>
  </div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
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
          <div className="bg-white rounded-lg shadow-lg p-4 mb-8">
            <h2 className="text-xl font-semibold mb-4">Products List</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map(product => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 whitespace-nowrap">
                        <input
                          type="text"
                          value={product.name}
                          onChange={e => setProducts(products.map(p => 
                            p.id === product.id ? { ...p, name: e.target.value } : p
                          ))}
                          className="border rounded px-2 py-1 w-full text-sm"
                        />
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <input
                            type="number"
                            value={product.price}
                            onChange={e => {
                              const newPrice = Number(e.target.value);
                              setProducts(products.map(p => 
                                p.id === product.id ? { ...p, price: newPrice } : p
                              ));
                            }}
                            className="border rounded px-2 py-1 w-20 text-sm"
                            min="0"
                            step="1"
                          />
                          <span className="ml-1 text-gray-500 text-sm">₹</span>
                        </div>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <select
                          value={product.category_id || ''}
                          onChange={e => setProducts(products.map(p => 
                            p.id === product.id ? { ...p, category_id: e.target.value } : p
                          ))}
                          className="border rounded px-2 py-1 text-sm w-32"
                        >
                          <option value="">Select Category</option>
                          {categories.map(category => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <select
                          value={product.stock_status || 'in_stock'}
                          onChange={e => setProducts(products.map(p => 
                            p.id === product.id ? { ...p, stock_status: e.target.value as 'in_stock' | 'out_of_stock' } : p
                          ))}
                          className="border rounded px-2 py-1 text-sm w-28"
                        >
                          <option value="in_stock">In Stock</option>
                          <option value="out_of_stock">Out of Stock</option>
                        </select>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap space-x-2">
                        <button
                          onClick={() => handleUpdateProduct(product)}
                          className="px-2 py-1 text-xs font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => toggleVisibility(product)}
                          className={`p-1.5 rounded ${product.is_visible ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}
                        >
                          {product.is_visible ? <FaEye /> : <FaEyeSlash />}
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-1.5 text-red-600 hover:text-red-900 rounded hover:bg-red-50"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
                  value={newProduct.category_id || ''}
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