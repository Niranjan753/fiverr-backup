import { supabase } from './supabase';
import { Product } from '@/app/types/product';
import { Category } from '@/types/database';
import { PostgrestError } from '@supabase/supabase-js';

export interface ApiError {
  message: string;
  details?: string;
}

// Type for category nested in product response
export interface CategoryResponse {
  name: string;
}

// Type for product with nested category from Supabase
export interface ProductWithNestedCategory extends Omit<Product, 'categories'> {
  categories: CategoryResponse | null;
}

// Helper function to safely convert Supabase response to our expected type
function convertSupabaseResponseToProduct(rawData: unknown): ProductWithNestedCategory {
  // First cast to unknown, then to our expected structure
  const data = rawData as Record<string, unknown>;
  const categoryData = data.categories as Record<string, string> | null;
  
  return {
    id: data.id as number,
    name: data.name as string,
    price: data.price as number,
    description: data.description as string,
    category_id: data.category_id as string,
    stock_status: data.stock_status as 'in_stock' | 'out_of_stock',
    is_visible: data.is_visible as boolean,
    image_url: data.image_url as string,
    updated_at: data.updated_at as string,
    categories: categoryData ? { name: categoryData.name } : null
  };
}

export async function fetchProducts() {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('id, name, price, description, category_id, stock_status, is_visible, image_url, updated_at, categories:categories(name)')
      .order('name');

    if (error) throw error;
    return { data, error: null };
  } catch (error: unknown) {
    const pgError = error as PostgrestError;
    console.error('Failed to fetch products:', pgError);
    return { 
      data: null, 
      error: { 
        message: pgError.message || 'Failed to fetch products', 
        details: pgError.details 
      } as ApiError 
    };
  }
}

export async function fetchCategories() {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('id, name')
      .order('name')
      .returns<Category[]>();

    if (error) throw error;
    return { data, error: null };
  } catch (error: unknown) {
    const pgError = error as PostgrestError;
    console.error('Failed to fetch categories:', pgError);
    return { 
      data: null, 
      error: { 
        message: pgError.message || 'Failed to fetch categories', 
        details: pgError.details 
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

    // Convert the raw response to our expected type safely
    const result = convertSupabaseResponseToProduct(data[0]);
    return { data: result, error: null };
  } catch (error: unknown) {
    // Convert the error to PostgrestError when possible, otherwise use Error
    const pgError = error instanceof Error ? error : (error as PostgrestError);
    console.error('Failed to update product:', pgError);
    return { 
      data: null, 
      error: { 
        message: pgError.message || 'Failed to update product', 
        details: 'details' in pgError ? pgError.details : undefined
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
  } catch (error: unknown) {
    const pgError = error as PostgrestError;
    console.error('Failed to delete product:', pgError);
    return { 
      success: false, 
      error: { 
        message: pgError.message || 'Failed to delete product', 
        details: pgError.details 
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
    
    // Convert the raw response to our expected type safely
    const result = convertSupabaseResponseToProduct(data);
    return { data: result, error: null };
  } catch (error: unknown) {
    const pgError = error as PostgrestError;
    console.error('Failed to add product:', pgError);
    return { 
      data: null, 
      error: { 
        message: pgError.message || 'Failed to add product', 
        details: pgError.details 
      } as ApiError 
    };
  }
} 