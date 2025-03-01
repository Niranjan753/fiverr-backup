'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface Product {
  id: string;
  name: string;
  price: number;
  discount: number;
  image: string;
  category: string;
  isVisible: boolean;
}

interface Category {
  id: string;
  name: string;
}

const AdminDashboard = () => {
  const supabase = createClientComponentClient();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [newProduct, setNewProduct] = useState<Product>({
    id: '',
    name: '',
    price: 0,
    discount: 0,
    image: '',
    category: '',
    isVisible: true,
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSaveProduct = async () => {
    const { error } = await supabase.from('products').insert([newProduct]);
    if (error) console.error('Error saving product:', error);
    else {
      fetchProducts(); // Refresh product list
      setNewProduct({ id: '', name: '', price: 0, discount: 0, image: '', category: '', isVisible: true }); // Reset form
    }
  };

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdateProduct = async (product: Product) => {
    const { error } = await supabase.from('products').update(product).eq('id', product.id);
    if (error) console.error('Error updating product:', error);
    else fetchProducts(); // Refresh product list
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <button onClick={handleToggleEdit} className="bg-green-500 text-white px-4 py-2 rounded mb-4">{isEditing ? 'Cancel Editing' : 'Edit Products'}</button>
      {isEditing && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Add New Product</h2>
          <input type="text" name="name" placeholder="Product Name" value={newProduct.name} onChange={handleInputChange} className="border p-2 mb-2 w-full" />
          <input type="number" name="price" placeholder="Price" value={newProduct.price} onChange={handleInputChange} className="border p-2 mb-2 w-full" />
          <input type="number" name="discount" placeholder="Discount" value={newProduct.discount} onChange={handleInputChange} className="border p-2 mb-2 w-full" />
          <input type="text" name="image" placeholder="Image URL" value={newProduct.image} onChange={handleInputChange} className="border p-2 mb-2 w-full" />
          <select name="category" value={newProduct.category} onChange={handleInputChange} className="border p-2 mb-2 w-full">
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
          <button onClick={handleSaveProduct} className="bg-blue-500 text-white px-4 py-2 rounded">Save Product</button>
        </div>
      )}
      <div>
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
                <td className="border border-gray-300 p-2">{product.name}</td>
                <td className="border border-gray-300 p-2">₹{product.price}</td>
                <td className="border border-gray-300 p-2">{product.discount}%</td>
                <td className="border border-gray-300 p-2"><button onClick={() => handleUpdateProduct(product)} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard; 