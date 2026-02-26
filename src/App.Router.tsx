import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './layouts/Layout'
import { Products } from './pages/Products'
import { productsLoader } from './pages/Products.loader'
import { NewProduct } from './pages/NewProduct'
import { newProductAction } from './pages/NewProduct.action'
import { EditProduct, action as editProductAction, loader as editProductLoader } from './pages/EditProduct'
import { HydrateFallback } from './components/HydrateFallback'
export const AppRouter = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        hydrateFallbackElement: <HydrateFallback />,
        children: [
            {
                index: true,
                element: <Products />,
                loader: productsLoader
            },
            {
                path: 'add-product',
                element: <NewProduct />,
                action: newProductAction
            },
            {
                path: 'edit-product/:id',
                element: <EditProduct />,
                loader: editProductLoader,
                action: editProductAction
            }
        ]
    }
])

