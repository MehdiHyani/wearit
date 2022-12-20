import React from 'react';

interface ProductProps {
    title: string
    desc: string
    price: number
    images: string[]
};

const Card = ({ sample, style }: { sample: ProductProps, style?: string }) => {
    return (
        <div className={'rounded-md bg-tertiary text-primary w-[40rem] h-[25rem] pl-[1rem] grid grid-cols-2 grid-rows-4 ' + (style ?? '')}>
            <div className="col-start-1 col-span-1 text-3xl font-bold max-w-xs">{sample.title}</div>
            <div className="col-start-1 col-span-1 max-w-xs opacity-50">{sample.desc}</div>
            <div className="col-start-1 col-span-1 max-w-xs text-primary text-[2rem]">{sample.price} <span className='text-secondary'>MAD</span></div>
            <div className="max-w-xs col-start-1 col-span-1 max-w-xs">
                <button className="h-2/3 w-2/3 rounded-3xl text-tertiary text-3xl bg-gradient-to-r from-[#43CBFF] to-[#9708CC]">Order Now</button>
            </div>
            <div className="col-start-2 row-start-1 row-span-4 self-center justify-self-center">
                <img src={sample.images[0]} alt={sample.title} />
            </div>
        </div>
    );
};

export default Card;
