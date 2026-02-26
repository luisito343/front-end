import { useForm } from 'react-hook-form';
import { useNavigate, useSubmit, Form, useActionData, type ActionFunctionArgs, type LoaderFunctionArgs, useLoaderData, redirect } from 'react-router-dom';
import { ArrowLeftIcon, SparklesIcon } from '@heroicons/react/24/outline';
import type { ActionData, ProductEditData } from '../interface';
import { getproductById, updateProduct } from '../services/ProductService';


export async function loader({ params }: LoaderFunctionArgs) {
    const product = await getproductById(Number(params.id));
    if (!product) {
        throw new Response("Product not found", { status: 404 });
    }
    return product;
} 

export async function action({ request, params }: ActionFunctionArgs) {
    const id = Number(params.id);
    if (!Number.isFinite(id)) {
        return { error: 'Invalid product ID' };
    }

    const formData = await request.formData();
    const name = String(formData.get('name') ?? '').trim();
    const price = parseFloat(String(formData.get('price') ?? ''));
    const available = String(formData.get('available') ?? 'false') === 'true';

    if (!name) {
        return { error: 'The name is required' };
    }

    if (name.length < 3) {
        return { error: 'Minimum 3 characters for product name' };
    }

    if (!Number.isFinite(price) || price <= 0) {
        return { error: 'Price must be greater than 0' };
    }

    const updated = await updateProduct(id, { name, price, available });
    if (!updated) {
        return { error: 'Error updating product' };
    }

    return redirect('/');
}

export const EditProduct = () => {
    const navigate = useNavigate();
    const submit = useSubmit();
    const actionData = useActionData() as ActionData | undefined;
    const product = useLoaderData() as ProductEditData | undefined;

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ProductEditData>();

    const onValidSubmit = (data: ProductEditData) => {
        submit(
            {
                name: data.name,
                price: String(data.price),
                available: String(data.available),
            },
            {
                method: 'post',
            }
        );
    };



    return (
        <div className="max-w-2xl mx-auto mt-10">
            {/* Botón para volver */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center text-sm text-gray-500 hover:text-blue-600 transition-colors mb-6 group"
            >
                <ArrowLeftIcon className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to list
            </button>

            <div className="bg-white rounded-2xl shadow-xl shadow-blue-900/5 border border-gray-100 overflow-hidden">
                <div className="bg-blue-600 px-8 py-6 flex items-center gap-3">
                    <SparklesIcon className="w-6 h-6 text-blue-200" />
                    <h2 className="text-xl font-bold text-white">Edit Product</h2>
                </div>

                <Form
                    method='post'
                    onSubmit={handleSubmit(onValidSubmit)}
                    className="p-8 space-y-6"
                >
                    {actionData?.error && (
                        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                            {actionData.error}
                        </p>
                    )}

                    {/* Nombre del Producto */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Product Name
                        </label>
                        <input
                            {...register("name", {
                                required: "The name is required",
                                minLength: { value: 3, message: "Minimum 3 characters" }
                            })}
                            type="text"
                            defaultValue={product?.name || ''}
                            placeholder='Ex: Dell Monitor 27"'
                            className={`w-full px-4 py-3 rounded-xl border transition-all outline-none focus:ring-4 ${errors.name
                                ? "border-red-300 focus:ring-red-50/50"
                                : "border-gray-200 focus:border-blue-500 focus:ring-blue-50/50"
                                }`}
                        />
                        {errors.name && (
                            <p className="mt-2 text-sm text-red-500">{errors.name.message}</p>
                        )}
                    </div>

                    {/* Precio del Producto */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Price (USD)
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
                            <input
                                {...register("price", {
                                    required: "The price is required",
                                    min: { value: 0.01, message: "Price must be greater than 0" },
                                    setValueAs: (value: string) => value === '' ? undefined : Number(value)
                                })}
                                type="number"
                                step="0.01"
                                defaultValue={product?.price || ''}
                                placeholder="0.00"
                                className={`w-full pl-8 pr-4 py-3 rounded-xl border transition-all outline-none focus:ring-4 ${errors.price
                                    ? "border-red-300 focus:ring-red-50/50"
                                    : "border-gray-200 focus:border-blue-500 focus:ring-blue-50/50"
                                    }`}
                            />
                        </div>
                        {errors.price && (
                            <p className="mt-2 text-sm text-red-500">{errors.price.message}</p>
                        )}
                    </div>

                    {/* Disponibilidad del producto */}
                    <div className="flex items-center gap-4">
                        <input
                            {...register("available")}
                            type="checkbox"
                            id="available"
                            defaultChecked={product?.available || false}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="available" className="text-sm text-gray-700">
                            Available in stock
                        </label>
                    </div>

                    {/* Botones de acción */}
                    <div className="pt-4 flex gap-4">
                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="flex-1 px-6 py-3 border border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? "Saving..." : "Edit Product"}
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    );
}
