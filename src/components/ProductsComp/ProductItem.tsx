import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import type { Product } from '../../interface';

interface ProductProps {
    product: Product;
    onEdit: (product: Product) => void;
    onDelete: (id: Product['id']) => void;
}

export const ProductItem = ({ product, onEdit, onDelete }: ProductProps ) => {
    return (
        <tr key={product.id} className="hover:bg-blue-50/30 transition-colors group">
            <td className="px-6 py-4">
                <span className="font-medium text-gray-800">{product.name}</span>
            </td>
            <td className="px-6 py-4 text-gray-600">
                ${product.price.toFixed(2)}
            </td>
            <td className="px-6 py-4">
                {product.available ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        In Stock
                    </span>
                ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Out of Stock
                    </span>
                )}
            </td>
            <td className="px-6 py-4">
                <div className="flex justify-center gap-3">
                    <button
                        onClick={() => onEdit(product)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                        title="Edit Product"
                    >
                        <PencilSquareIcon className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => onDelete(product.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                        title="Delete Product"
                    >
                        <TrashIcon className="w-5 h-5" />
                    </button>
                </div>
            </td>
        </tr>
    )
}
