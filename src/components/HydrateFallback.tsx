export const HydrateFallback = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-gray-200 bg-white px-8 py-6 shadow-sm">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />
                <div className="text-center">
                    <p className="text-base font-semibold text-gray-800">Cargando inventario</p>
                    <p className="text-sm text-gray-500">Preparando la aplicación...</p>
                </div>
            </div>
        </div>
    )
}
