import React from 'react';
import { EuiPageTemplate, EuiButton } from '@elastic/eui';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateProductMutation } from '../app/product/productApiSlice';
import { useNavigate } from 'react-router-dom';

const NewProduct = () => {
    const [createProduct] = useCreateProductMutation();
    const navigate = useNavigate();

    const validationSchema = z.object({
        name: z.string({ required_error: 'Required' }),
        price: z.string({ required_error: 'Required' }).min(0, 'Invalid price'),
        imageUrls: z.string().optional(),
        availableQuantity: z.string({ required_error: 'Required' }).min(0, 'Invalid quantity')
    });

    type validationSchemaType = z.infer<typeof validationSchema>;

    const { register, handleSubmit, formState: { errors } } =
        useForm<validationSchemaType>(({
            defaultValues: {
                availableQuantity: '0',
                imageUrls: '',
                name: '',
                price: '0'
            },
            resolver: zodResolver(validationSchema)
        }));

    const handleCreateProduct = async (data: validationSchemaType) => {
        try {
            const modifiedData = {
                availableQuantity: parseInt(data.availableQuantity),
                name: data.name,
                price: parseFloat(data.price),
                imageUrls: data.imageUrls?.split(',').map((url) => url.trim())
            };
            await createProduct(modifiedData).unwrap();
            navigate('/products');
        } catch (error) { }
    };

    return (
        <EuiPageTemplate className='bg-primary' panelled >
            <div className='bg-primary pt-20 p-4 h-full'>
                <form className='h-[70vh]' id='form_add_product' onSubmit={handleSubmit(handleCreateProduct)}>
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
                        <EuiButton size='m' fill type='submit'>Add product</EuiButton>
                    </div>
                </form>
            </div>
        </EuiPageTemplate>
    );
};

export default NewProduct;
