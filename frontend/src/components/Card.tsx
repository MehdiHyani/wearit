import React from 'react';
import { CardProps } from '../utils/types';

const Card = ({
    product,
    generalStyle,
    titleStyle,
    btnStyle,
    priceStyle
}: CardProps) => {
    return (
        <div
            className={
                'pl-2 rounded-md text-primary grid grid-cols-2 grid-rows-4 ' +
        generalStyle
            }
        >
            <div
                className={`col-start-1 col-span-1 font-bold max-w-xs ${titleStyle}`}
            >
                {product.PRO_NAME}
            </div>
            <div className={`col-start-1 col-span-1 max-w-xs text-primary ${priceStyle}`}>
                {product.PRO_PRICE} <span className="text-secondary">MAD</span>
            </div>
            <div className="max-w-xs col-start-1 col-span-1 max-w-xs">
                <button className={' text-tertiary bg-gradient-to-r ' + btnStyle}>
          Order Now
                </button>
            </div>
            <div className="col-start-2 row-start-1 row-span-4 self-center justify-self-center">
                <img src={product.PRO_IMAGES[0].IMG_URL} alt={product.PRO_NAME} />
            </div>
        </div>
    );
};

export default Card;
