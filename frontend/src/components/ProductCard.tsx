import React from 'react';
import { Product } from '../utils/types';
import { useAppDispatch } from '../app/hooks';
import { addToCart } from '../app/cart/cartSlice';
import { Link } from 'react-router-dom';

const ProductCard = ({
    product
}: { product: Product }) => {
    const dispatch = useAppDispatch();
    const HandleOnClick = (product: Product) => {
        dispatch(addToCart(product));
    };
    return (
        <Link to={`${product.PRO_ID}`}>
            <div className='w-[14rem] h-[18rem] p-3 rounded-md bg-white text-primary grid grid-rows-8 justify-items-center'>

                <img className='row-start-0 row-span-4 w-[5rem] h-[6rem] self-center' src={product.PRO_IMAGES[0].IMG_URL} alt={product.PRO_NAME} />
                <h1 className='font-semibold row-start-5 row-span-2 overflow-hidden text-secondary text-center overflow-content'>{product.PRO_NAME}</h1>
                <p className='row-span-1 font-bold'>{product.PRO_PRICE} MAD</p>

                <button onClick={() => HandleOnClick(product)} className='h-[3rem] w-[8rem] bg-white hover:bg-blue-300 text-gray-800 font-semibold py-2 px-4 border border-blue-400 rounded shadow'>Order Now</button>
            </div>
        </Link>
    );
};

export default ProductCard;
