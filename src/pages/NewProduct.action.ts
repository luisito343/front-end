import { redirect } from 'react-router-dom';
import { addProduct } from '../services/ProductService';

export async function newProductAction({ request }: { request: Request }) {
    const formData = await request.formData();
    const name = String(formData.get('name') ?? '').trim();
    const price = parseFloat(String(formData.get('price') ?? ''));

    if (!name) {
        return { error: 'The name is required' };
    }

    if (name.length < 3) {
        return { error: 'Minimum 3 characters for product name' };
    }

    if (!Number.isFinite(price) || price <= 0) {
        return { error: 'Price must be greater than 0' };
    }

    console.log('Received new product:', { name, price });
    await addProduct({ name, price });
    return redirect('/');
}
