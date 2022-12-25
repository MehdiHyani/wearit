import React from 'react';
import { useAppSelector } from '../app/hooks';
import { selectCart } from '../app/cart/cartSlice';

const Cart = () => {
    const cart = useAppSelector(selectCart);
    return (
        <div>Cart</div>
    );
};

export default Cart;
