import React from 'react';
import { useGetAllProductsQuery } from '../app/product/productApiSlice';
import ProductCard from '../components/ProductCard';

const Products = () => {
    const { data, isLoading, error } = useGetAllProductsQuery({});
    if (isLoading || !data) {
        return <h1>Loading...</h1>;
    }
    if (error) {
        return <h1>Something went wrong</h1>;
    }
    console.log(data);
    return (
        <section className="p-[10rem] text-tertiary bg-primary min-w-screen min-h-screen">
            <div className='flex'>
            </div>
            <div className='text-[2rem] font-semibold'>Results: {data.length}</div>
            <div className='grid grid-cols-5 gap-2.5 '>
                {data.map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}
            </div>
        </section>
    );
};

export default Products;
