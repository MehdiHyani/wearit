import React from 'react';

const Products = () => {
    return (
        <section className="flex flex-col">
            <div className='flex'>
                <h1 className='inline-block'>Casablanca Store</h1>
                <div className='inline-block'>
            Trier Par:
                </div>
            </div>
            <div>9999 results</div>
            <div className='grid grid-cols-5 gap-2.5 '>
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
            </div>
        </section>
    );
};

export default Products;
