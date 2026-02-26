import { MagnifyingGlassIcon, FunnelIcon, ArrowsUpDownIcon } from '@heroicons/react/24/outline';
import { useFilters } from '../../hooks/useFilters';

const ProductFilters = () => {
    const { name,
        setName,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        searchParams,
        setSearchParams,
        updateSingleParam } = useFilters();

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
                {/* Búsqueda por Nombre */}
                <div className="flex-1 relative">
                    <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                {/* Ordenar por campo */}
                <div className="flex items-center gap-2">
                    <ArrowsUpDownIcon className="w-5 h-5 text-gray-400" />
                    <select
                        className="px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-blue-500 bg-white cursor-pointer"
                        value={searchParams.get('sortBy') || 'name'}
                        onChange={(e) => updateSingleParam('sortBy', e.target.value)}

                    >
                        <option value="">---Selelect an Option---</option>
                        <option value="name">Name</option>
                        <option value="price">Price</option>
                        <option value="available">Availability</option>
                    </select>

                    <select
                        className="px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-blue-500 bg-white cursor-pointer"
                        value={searchParams.get('order') || 'DESC'}
                        onChange={(e) => updateSingleParam('order', e.target.value)}
                    >
                        <option value="ASC">ASC</option>
                        <option value="DESC">DESC</option>
                    </select>
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-gray-50">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                    <FunnelIcon className="w-4 h-4" />
                    Price Range:
                </div>

                {/* Rango de Precios */}
                <div className="flex items-center gap-3">
                    <input
                        type="number"
                        placeholder="Min"
                        className="w-24 px-3 py-1.5 rounded-lg border border-gray-200 outline-none focus:border-blue-500 text-sm"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                    />
                    <span className="text-gray-300">to</span>
                    <input
                        type="number"
                        placeholder="Max"
                        className="w-24 px-3 py-1.5 rounded-lg border border-gray-200 outline-none focus:border-blue-500 text-sm"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                    />
                </div>

                {/* Botón para limpiar filtros */}
                <button
                    onClick={() => {
                        setName('');
                        setMinPrice('');
                        setMaxPrice('');
                        setSearchParams({}, { replace: true });
                    }}
                    className="ml-auto text-sm text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                >
                    Clear All Filters
                </button>
            </div>
        </div>
    );
};

export default ProductFilters;