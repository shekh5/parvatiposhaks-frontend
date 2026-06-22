import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
  error: null,
  sucess: false,
  message: null,
  removingId: null,
  shippingInfo: localStorage.getItem('shippingInfo')
    ? JSON.parse(localStorage.getItem('shippingInfo'))
    : {},
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const isItemExist = state.cartItems.find((i) => i.product === item.product);

      if (isItemExist) {
        state.cartItems = state.cartItems.map((i) =>
          i.product === isItemExist.product ? item : i
        );
      } else {
        state.cartItems.push(item);
      }

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((i) => i.product !== action.payload);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      state.removingId = null;
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem('cartItems');
    },
    removeErrors: (state) => {
      state.error = null;
    },
    removeMessage: (state) => {
      state.message = null;
    },
    saveShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;
      localStorage.setItem('shippingInfo', JSON.stringify(state.shippingInfo));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  removeErrors,
  removeMessage,
  saveShippingInfo,
} = cartSlice.actions;
export default cartSlice.reducer;
