import { useLoaderData, useNavigate } from 'react-router-dom';
import { ProductItem } from './ProductItem';
import type { Product } from '../../interface';
import { deleteProduct } from '../../services/ProductService';



const ProductList = () => {
    const products = useLoaderData() as Product[];
    const navigate = useNavigate();

    const onEdit = (product: Product) => {
        navigate(`/edit-product/${product.id}`);
    };

    const onDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            deleteProduct(id).then((success) => {
                if (success) {
                    navigate(0); // Refresh the page to update the product list
                } else {
                    alert('Error deleting product. Please try again.');
                }
            });
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Product</th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Price</th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {products.map((product) => (
                            <ProductItem key={product.id} product={product} onEdit={onEdit} onDelete={onDelete} />
                        ))}
                    </tbody>
                </table>
            </div>

            {products.length === 0 && (
                <div className="py-12 text-center">
                    <p className="text-gray-400 italic">No products found in the inventory.</p>
                </div>
            )}
        </div>
    );
};

export default ProductList;