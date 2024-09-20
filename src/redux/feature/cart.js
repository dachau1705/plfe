// src/redux/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [], // Array to store cart items
        totalQuantity: 0,
        totalAmount: 0,
    },
    reducers: {
        addToCart(state, action) {
            const { items } = action.payload;  // Destructure `items`
            items.forEach(newItem => {
                const existingItem = state.items.find(item => item.productId === newItem.productId);

                if (!existingItem) {
                    state.items.push({
                        productId: newItem.productId,
                        name: newItem.name,
                        price: newItem.price,
                        image: newItem.image,
                        quantity: newItem.quantity,
                        totalPrice: newItem.total_price,
                    });
                } else {
                    existingItem.quantity += newItem.quantity;
                    existingItem.totalPrice += newItem.total_price;
                }
                state.totalAmount += newItem.total_price;
                state.totalQuantity += newItem.quantity;
            });
        },
        removeFromCart(state, action) {
            const { productId } = action.payload;
            const existingItem = state.items.find(item => item.productId === productId);

            if (existingItem) {
                state.totalQuantity -= existingItem.quantity;
                state.totalAmount -= existingItem.quantity * existingItem.price;
                state.items = state.items.filter(item => item.productId !== productId);
            }
        },
        updateQuantity(state, action) {
            const { productId, type } = action.payload;
            const existingItem = state.items.find(item => item.productId === productId);

            if (existingItem) {
                state.totalAmount += (type === 1 ? existingItem.price : (existingItem.price * -1));
                state.totalQuantity += (type === 1 ? 1 : (1 * -1));
                existingItem.quantity = (type === 1 ? existingItem.quantity + 1 : existingItem.quantity - 1);
                existingItem.totalPrice = existingItem.price * (type === 1 ? existingItem.quantity + 1 : existingItem.quantity - 1);
            }
        },
        clearCart(state) {
            state.items = [];
            state.totalQuantity = 0;
            state.totalAmount = 0;
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
