import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';

export const useFilters = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [name, setName] = useState(searchParams.get('name') || '');
    const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
    const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');

    useEffect(() => {
        setName(searchParams.get('name') || '');
        setMinPrice(searchParams.get('minPrice') || '');
        setMaxPrice(searchParams.get('maxPrice') || '');
    }, [searchParams]);

    useEffect(() => {
        const newParams = new URLSearchParams(searchParams);
        let shouldUpdate = false;

        if (!newParams.get('sortBy')) {
            newParams.set('sortBy', 'name');
            shouldUpdate = true;
        }

        if (!newParams.get('order')) {
            newParams.set('order', 'DESC');
            shouldUpdate = true;
        }

        if (shouldUpdate) {
            setSearchParams(newParams, { replace: true });
        }
    }, [searchParams, setSearchParams]);

    const updateSingleParam = (key: string, value: string) => {
        const newParams = new URLSearchParams(searchParams);
        if (value) {
            newParams.set(key, value);
        } else {
            newParams.delete(key);
        }
        setSearchParams(newParams, { replace: true });
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            updateSingleParam('name', name);
        }, 350);

        return () => clearTimeout(timeoutId);
    }, [name]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            updateSingleParam('minPrice', minPrice);
        }, 350);

        return () => clearTimeout(timeoutId);
    }, [minPrice]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            updateSingleParam('maxPrice', maxPrice);
        }, 350);

        return () => clearTimeout(timeoutId);
    }, [maxPrice]);


    return {
        name,
        setName,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        searchParams,
        setSearchParams,
        updateSingleParam
    };
}
