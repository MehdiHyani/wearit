import React, { useEffect } from 'react';
import { CartItem } from '../utils/types';
import { removeItem } from '../app/cart/cartSlice';
import { useAppDispatch } from '../app/hooks';

const Cart = () => {
    const dispatch = useAppDispatch();
    const HandleOnClick = (product: CartItem) => {
        dispatch(removeItem(product));
    };
    const cart = localStorage.getItem('cart');
    if (!cart) {
        return (<div>Cart is empty</div>);
    }
    useEffect(() => {}, [cart]);
    return (
        <div className='grid grid-col-1'>
            {JSON.parse(cart).map((product: CartItem, index: number) => {
                return (
                    <div key={index} className='grid grid-cols-3'>
                        <div className='col-span-1'>
                            <img className='h-[10rem] w-[10rem]' src={product.PRO_IMAGES[0].IMG_URL} alt={product.PRO_NAME} />
                        </div>
                        <div className='col-span-1'>
                            <h1>{product.PRO_NAME}</h1>
                            <p>{product.PRO_PRICE} MAD</p>
                        </div>
                        <div className='col-span-1'>
                            <button onClick={() => HandleOnClick(product)} className='bg-red-500 text-white'>Remove</button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Cart;
