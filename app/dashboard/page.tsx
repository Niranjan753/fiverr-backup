'use client';
import { useState, useEffect } from 'react';
import { FaTrash, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Product } from '@/app/types/product';
import { Category } from '@/types/database';
import { toast } from 'react-hot-toast';
import { 
  fetchProducts, 
  fetchCategories, 
  updateProduct, 
  deleteProduct, 
  addProduct,
  ApiError 
} from '@/lib/productService';

interface DatabaseError {
  message: string;
}

interface ProductWithCategory extends Omit<Product, 'categories'> {
  categories: {
    name: string;
  } | null;
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
    setLoading(true);
    try {
      // Fetch products
      const productsResult = await fetchProducts();
      if (productsResult.error) {
        toast.error('Error fetching products: ' + productsResult.error.message);
        return;
      }

      if (productsResult.data) {
        const typedProductsData = productsResult.data.map(product => ({
          ...product,
          categories: product.categories ? { name: (product.categories as any).name } : null
        })) as unknown as ProductWithCategory[];
        
        setProducts(typedProductsData.map(product => ({
          ...product,
          category_name: product.categories?.name || ''
        })));
      }

      // Fetch categories
      const categoriesResult = await fetchCategories();
      if (categoriesResult.error) {
        toast.error('Error fetching categories: ' + categoriesResult.error.message);
        return;
      }
      
      if (categoriesResult.data) {
        setCategories(categoriesResult.data);
      }
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
      const result = await addProduct(newProduct);
      
      if (result.error) {
        throw result.error;
      }

      if (result.data) {
        const productWithCategory = {
          ...result.data,
          categories: result.data.categories ? { name: (result.data.categories as any).name } : null
        } as unknown as ProductWithCategory;
        
        setProducts([...products, {
          ...productWithCategory,
          category_name: productWithCategory.categories?.name || ''
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
      }
    } catch (error: unknown) {
      const apiError = error as ApiError;
      toast.error('Error adding product: ' + apiError.message);
    }
  };

  const handleUpdateProduct = async (product: Product) => {
    try {
      const result = await updateProduct(product);
      
      if (result.error) {
        throw result.error;
      }

      if (result.data) {
        const updatedProduct = result.data;
        const typedProduct = {
          ...updatedProduct,
          categories: updatedProduct.categories ? { name: (updatedProduct.categories as any).name } : null
        } as unknown as ProductWithCategory;

        setProducts(products.map(p => (p.id === product.id ? {
          ...typedProduct,
          category_name: typedProduct.categories?.name || ''
        } : p)));
        
        toast.success('Product updated successfully!');
      }
    } catch (error: unknown) {
      const apiError = error as ApiError;
      toast.error('Error updating product: ' + apiError.message);
      fetchData();
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const result = await deleteProduct(id);
      
      if (result.error) {
        throw result.error;
      }

      if (result.success) {
        setProducts(products.filter(product => product.id !== id));
        toast.success('Product deleted successfully!');
      }
    } catch (error: unknown) {
      const apiError = error as ApiError;
      toast.error('Error deleting product: ' + apiError.message);
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