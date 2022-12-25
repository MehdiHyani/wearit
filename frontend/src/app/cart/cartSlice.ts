import { RootState } from './../store';
// src/redux/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { CartItem } from '../../utils/types';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [] as CartItem[]
    },
    reducers: {
        addToCart: (state, action) => {
            const itemInCart = state.cart.find((item) => item.PRO_ID === action.payload.id);
            if (itemInCart) {
                itemInCart.quantity++;
            } else {
                state.cart.push({ ...action.payload, quantity: 1 });
            }
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        incrementQuantity: (state, action) => {
            const item = state.cart.find((item) => item.PRO_ID === action.payload);
            if (item) { item.quantity++; }
        },
        decrementQuantity: (state, action) => {
            const item = state.cart.find((item) => item.PRO_ID === action.payload);
            if (item) {
                if (item.quantity === 1) {
                    item.quantity = 1;
                } else {
                    item.quantity--;
                }
            }
        },
        removeItem: (state, action) => {
            const removeItem = state.cart.filter((item) => item.PRO_ID !== action.payload);
            state.cart = removeItem;
            localStorage.setItem('cart', JSON.stringify(state.cart));
        }
    }
});

export const cartReducer = cartSlice.reducer;
export const {
    addToCart,
    incrementQuantity,
    decrementQuantity,
    removeItem
} = cartSlice.actions;
export const selectCart = (state: RootState) => state.cart.cart;
