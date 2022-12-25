import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useGetAllProductsQuery } from '../app/product/productApiSlice';
import ProductCard from '../components/ProductCard';

const Products = () => {
    const { search } = useLocation();
    const [page, setPage] = useState(1);
    const { data, isLoading, error } = useGetAllProductsQuery({ page, query: search.slice(1) }, { refetchOnMountOrArgChange: true });
    if (isLoading || !data) {
        return <h1>Loading...</h1>;
    }
    if (error) {
        return <h1>Something went wrong</h1>;
    }
    return (
        <section className="overflow-x-hidden p-[2rem] text-tertiary bg-primary min-w-screen min-h-screen">
            <div className='text-[2rem] font-semibold'>Results: {data.length}</div>
            <div className='grid grid-cols-5 gap-2.5 '>
                {data.map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}
            </div>
            <div className='pt-6 place-content-center text-black font-semibold w-full self-center mx-[43%]'>
                <button onClick={() => setPage(p => p - 1)} disabled={page === 1} className='h-[2rem] w-[5rem] bg-white border-solid border-2 rounded-l-lg border-sky-500'>Prev</button>
                <button onClick={() => setPage(p => p + 1)} className='h-[2rem] w-[5rem] bg-white border-solid border-2 rounded-r-lg border-sky-500'>Next</button>
            </div>
        </section>
    );
};

export default Products;
