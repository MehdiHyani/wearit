import React from 'react';

interface ProductProps {
    title: string
    desc: string
    price: number
    images: string[]
}

interface CardProps {
    product: ProductProps
    generalStyle: string
    titleStyle: string
    descColor: string
    btnStyle: string
    priceStyle: string
}

const Card = ({
    product,
    generalStyle,
    titleStyle,
    descColor,
    btnStyle,
    priceStyle
}: CardProps) => {
    return (
        <div
            className={
                'pl-2 rounded-md bg-tertiary text-primary grid grid-cols-2 grid-rows-4 bg-gradient-to-r ' +
        generalStyle
            }
        >
            <div
                className={`col-start-1 col-span-1 font-bold max-w-xs ${titleStyle}`}
            >
                {product.title}
            </div>
            <div
                className={`col-start-1 col-span-1 max-w-xs opacity-50 ${descColor}`}
            >
                {product.desc}
            </div>
            <div className={`col-start-1 col-span-1 max-w-xs text-primary ${priceStyle}`}>
                {product.price} <span className="text-secondary">MAD</span>
            </div>
            <div className="max-w-xs col-start-1 col-span-1 max-w-xs">
                <button className={' text-tertiary bg-gradient-to-r ' + btnStyle}>
          Order Now
                </button>
            </div>
            <div className="col-start-2 row-start-1 row-span-4 self-center justify-self-center">
                <img src={product.images[0]} alt={product.title} />
            </div>
        </div>
    );
};

export default Card;
