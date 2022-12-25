import React from 'react';
import { EuiPageTemplate, EuiButton } from '@elastic/eui';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEditProductMutation, useGetProductQuery } from '../app/product/productApiSlice';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

const EditProduct = () => {
    const [editProduct] = useEditProductMutation();
    const navigate = useNavigate();
    const { productId } = useParams();
    const { data, isLoading, error } = useGetProductQuery({
        productId: parseInt(productId ?? '')
    });

    const validationSchema = z.object({
        name: z.string({ required_error: 'Required' }),
        price: z.string({ required_error: 'Required' }).min(0, 'Invalid price'),
        imageUrls: z.string().optional(),
        availableQuantity: z.string({ required_error: 'Required' }).min(0, 'Invalid quantity')
    });

    type validationSchemaType = z.infer<typeof validationSchema>;

    const { register, handleSubmit, formState: { errors }, reset } =
        useForm<validationSchemaType>(({
            defaultValues: {
                availableQuantity: '0',
                imageUrls: '',
                name: '',
                price: '0'
            },
            resolver: zodResolver(validationSchema)
        }));

    const handleEditProduct = async (data: validationSchemaType) => {
        try {
            const modifiedData = {
                availableQuantity: parseInt(data.availableQuantity),
                name: data.name,
                price: parseFloat(data.price),
                imageUrls: data.imageUrls?.split(',').map((url) => url.trim())
            };
            await editProduct({
                product: modifiedData,
                productId: parseInt(productId ?? '')
            }).unwrap();
            navigate('/products');
        } catch (error) { }
    };

    React.useEffect(() => {
        if (data) {
            const formattedData = {
                availableQuantity: data.PRO_AVAILABLE_QUANTITY.toString(),
                imageUrls: data.PRO_IMAGES.map((img) => img.IMG_URL).join(','),
                name: data.PRO_NAME,
                price: data.PRO_PRICE.toString()
            };
            reset(formattedData);
        }
    }, [data]);

    if (isLoading) { return <div>Loading...</div>; }

    if (error) { return <Navigate to='/500' />; }

    return (
        <EuiPageTemplate className='bg-primary' panelled >
            <div className='bg-primary pt-20 p-4 h-full'>
                <form className='h-[70vh]' id='form_add_product' onSubmit={handleSubmit(handleEditProduct)}>
                    <div className='flex flex-col items-center h-full justify-between'>
                        <label className='font-medium text-secondary'>Product name:</label>
                        <input {...register('name')}
                            className="shadow text-center appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Morocco home jersey" />
                        <p className='mt-2 mb-5 text-red-500 text-xs'>{errors.name?.message}</p>

                        <label className='font-medium text-secondary'>Product price:</label>
                        <input {...register('price')} step="0.01"
                            className="shadow text-center appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="number" placeholder="99.99" />
                        <p className='mt-2 mb-5 text-red-500 text-xs'>{errors.price?.message}</p>

                        <label className='font-medium text-secondary'>Product available quantity:</label>
                        <input {...register('availableQuantity')}
                            className="shadow text-center appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="number" placeholder="9999999" />
                        <p className='mt-2 mb-5 text-red-500 text-xs'>{errors.availableQuantity?.message}</p>

                        <label className='font-medium text-secondary'>Product Images (URLs separated by commas):</label>
                        <input {...register('imageUrls')}
                            className="shadow text-center appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="https://..." />
                        <p className='mt-2 mb-5 text-red-500 text-xs'>{errors.imageUrls?.message}</p>
                    </div>
                    <div className='fixed right-20'>
                        <EuiButton size='m' fill type='submit'>Edit product</EuiButton>
                    </div>
                </form>
            </div>
        </EuiPageTemplate>
    );
};

export default EditProduct;
