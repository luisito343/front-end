import * as v from 'valibot';


export const DraftProductSchema = v.object({
    name: v.pipe(
        v.string(),
        v.trim(),
        v.minLength(3, 'El nombre debe tener al menos 3 caracteres'),
        v.maxLength(100, 'Nombre demasiado largo')
    ),
    // Usamos pipe para transformar la entrada (string de input) a número
    price: v.pipe(
        v.unknown(),
        v.transform((input) => Number(input)),
        v.number('El precio debe ser un número válido'),
        v.minValue(0.01, 'El precio debe ser mayor a 0')
    ),
});

export const ActionDataSchema = v.object({
    error: v.optional(v.string()),
});

export const ProductListItemSchema = v.object({
    id: v.number(),
    name: v.string(),
    price: v.number(),
    available: v.boolean(),
});

export const ProductListSchema = v.array(ProductListItemSchema);

export const ProductEditSchema = v.object({
    name: v.pipe(
        v.string(),
        v.trim(),
        v.minLength(3, 'El nombre debe tener al menos 3 caracteres'),
        v.maxLength(100, 'Nombre demasiado largo')
    ),
    // Usamos pipe para transformar la entrada (string de input) a número
    price: v.pipe(
        v.unknown(),
        v.transform((input) => Number(input)),
        v.number('El precio debe ser un número válido'),
        v.minValue(0.01, 'El precio debe ser mayor a 0')
    ),
    available: v.pipe(
        v.unknown(),
        v.transform((input) => {
            if (input === 'true' || input === true) return true;
            if (input === 'false' || input === false) return false;
            throw new Error('Valor no válido para disponible');
        })
    )
});


export type ProductFormData = v.InferOutput<typeof DraftProductSchema>;
export type ProductEditData = v.InferOutput<typeof ProductEditSchema>;
export type ActionData = v.InferOutput<typeof ActionDataSchema>;
export type Product = v.InferOutput<typeof ProductListItemSchema>;