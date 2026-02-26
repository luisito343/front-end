import axios from 'axios'
import { ProductEditSchema, ProductListItemSchema, ProductListSchema, type Product, type ProductFormData } from '../interface';
import { safeParse } from 'valibot';

type ProductFilters = {
    name?: string;
    sortBy?: string;
    order?: 'ASC' | 'DESC';
    minPrice?: string;
    maxPrice?: string;
}

export async function addProduct({ name, price }: ProductFormData) {
    try {
        const url = `${import.meta.env.VITE_API_URL}products`;
        const response = await axios.post(url, { name, price });
        console.log('Product added successfully:', response.data);

    } catch (error) {
        console.error('Error adding product:', error);
    }
}


export async function getProducts(filters?: ProductFilters, signal?: AbortSignal) {
    try {
        const url = `${import.meta.env.VITE_API_URL}products`;
        const params = Object.fromEntries(
            Object.entries(filters ?? {}).filter(([, value]) => value !== undefined && value !== '')
        );
        const response = await axios.get(url, { params, signal });
        const result = safeParse(ProductListSchema, response.data.data);
        if (result.success) {
            return result.output;
        } else {
            console.error('Validation errors:', result.issues);
            return [];
        }
    } catch (error) {
        if (axios.isCancel(error)) {
            return [];
        }
        console.error('Error fetching products:', error);
        return [];
    }
}

export async function getproductById(id: Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}products/${id}`;
        const response = await axios.get(url);
        const result = safeParse(ProductListItemSchema,response.data.data);
        console.log('Product fetched successfully:', result);
        if (result.success) {
            return result.output;
        } else {
            console.error('Validation errors:', result.issues);
            return null;
        }
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
}

export async function updateProduct(id: Product['id'], data: { name: string; price: number; available: boolean }) {
    try {
        const url = `${import.meta.env.VITE_API_URL}products/${id}`;
        const response = await axios.put(url, data);
        const result = safeParse(ProductEditSchema, response.data.data);
        console.log('Product updated successfully:', result.output);
        if (result.success) {
            return result.output;
        } else {
            console.error('Validation errors:', result.issues);
            return null;
        }
    } catch (error) {
        console.error('Error updating product:', error);
        return false;
    }
}

export async function deleteProduct(id: Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}products/${id}`;
        await axios.delete(url);
        console.log('Product deleted successfully');
        return true;
    } catch (error) {
        console.error('Error deleting product:', error);
        return false;
    }
}