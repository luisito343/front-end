import { getProducts } from "../services/ProductService";

type ProductsLoaderArgs = {
    request: Request;
}

export async function productsLoader({ request }: ProductsLoaderArgs) {
    const url = new URL(request.url);
    const products = await getProducts({
        name: url.searchParams.get('name') ?? undefined,
        sortBy: url.searchParams.get('sortBy') ?? undefined,
        order: (url.searchParams.get('order') as 'ASC' | 'DESC' | null) ?? undefined,
        minPrice: url.searchParams.get('minPrice') ?? undefined,
        maxPrice: url.searchParams.get('maxPrice') ?? undefined,
    }, request.signal);
    return products;
}
