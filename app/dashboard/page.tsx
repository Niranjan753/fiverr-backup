'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { supabase } from '@/lib/supabase';
import { Product, Category } from '@/types/database';

export default function Dashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'products' | 'categories'>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    price: 0,
    description: '',
    image_url: '',
    category_id: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select('*, categories(name)')
          .order('name');

        if (productsError) {
          console.error('Error fetching products:', productsError.message || productsError);
          return; // Exit if there's an error
        }
        setProducts(productsData);

        const { data: categoriesData, error: categoriesError } = await supabase
          .from('categories')
          .select('*')
          .order('name');

        if (categoriesError) {
          console.error('Error fetching categories:', categoriesError.message || categoriesError);
          return; // Exit if there's an error
        }
        setCategories(categoriesData);
      } catch (error) {
        console.error('Unexpected error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('products')
      .insert([newProduct])
      .select()
      .single();

    if (error) {
      console.error('Error adding product:', error);
    } else {
      setProducts([...products, data]);
      setNewProduct({ name: '', price: 0, description: '', image_url: '', category_id: '' });
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Product List</h1>
      <button onClick={() => setActiveTab('products')}>Products</button>
      <button onClick={() => setActiveTab('categories')}>Categories</button>

      {activeTab === 'products' && (
        <div>
          <h2>Products</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{categories.find(c => c.id === product.category_id)?.name}</td>
                  <td>
                    <FaEdit />
                    <FaTrash />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>Add New Product</h3>
          <form onSubmit={handleAddProduct}>
            <input type="text" value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} placeholder="Product Name" required />
            <input type="number" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: Number(e.target.value) })} placeholder="Price" required />
            <textarea value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} placeholder="Description" />
            <select value={newProduct.category_id} onChange={e => setNewProduct({ ...newProduct, category_id: e.target.value })}>
              <option value="">Select Category</option>
              {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
            </select>
            <input type="text" value={newProduct.image_url} onChange={e => setNewProduct({ ...newProduct, image_url: e.target.value })} placeholder="Image URL" />
            <button type="submit">Add Product</button>
          </form>
        </div>
      )}
    </div>
  );
}
