import { supabase } from './supabase';
import { Product } from '@/app/types/product';

export interface ApiError {
  message: string;
  details?: string;
}

export async function fetchProducts() {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('id, name, price, description, category_id, stock_status, is_visible, image_url, updated_at, categories:categories(name)')
      .order('name');

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Failed to fetch products:', error);
    return { 
      data: null, 
      error: { 
        message: error.message || 'Failed to fetch products', 
        details: error.details 
      } as ApiError 
    };
  }
}

export async function fetchCategories() {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('id, name, created_at')
      .order('name');

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Failed to fetch categories:', error);
    return { 
      data: null, 
      error: { 
        message: error.message || 'Failed to fetch categories', 
        details: error.details 
      } as ApiError 
    };
  }
}

export async function updateProduct(product: Product) {
  try {
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

    // Perform the update
    const { error: updateError } = await supabase
      .from('products')
      .update(updateData)
      .eq('id', product.id);

    if (updateError) throw updateError;

    // Wait a moment to ensure the update has propagated
    await new Promise(resolve => setTimeout(resolve, 300));

    // Fetch the updated product
    const { data, error: fetchError } = await supabase
      .from('products')
      .select('id, name, price, description, category_id, stock_status, is_visible, image_url, updated_at, categories:categories(name)')
      .eq('id', product.id);

    if (fetchError) throw fetchError;
    if (!data || data.length === 0) throw new Error('No data returned after update');

    return { data: data[0], error: null };
  } catch (error: any) {
    console.error('Failed to update product:', error);
    return { 
      data: null, 
      error: { 
        message: error.message || 'Failed to update product', 
        details: error.details 
      } as ApiError 
    };
  }
}

export async function deleteProduct(id: number) {
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true, error: null };
  } catch (error: any) {
    console.error('Failed to delete product:', error);
    return { 
      success: false, 
      error: { 
        message: error.message || 'Failed to delete product', 
        details: error.details 
      } as ApiError 
    };
  }
}

export async function addProduct(newProduct: Partial<Product>) {
  try {
    const { data, error } = await supabase
      .from('products')
      .insert([newProduct])
      .select('id, name, price, description, category_id, stock_status, is_visible, image_url, updated_at, categories:categories(name)')
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Failed to add product:', error);
    return { 
      data: null, 
      error: { 
        message: error.message || 'Failed to add product', 
        details: error.details 
      } as ApiError 
    };
  }
} 