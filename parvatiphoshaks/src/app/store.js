import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products/productSlice.js";
import userReducer from "../features/user/userSlice.js";
import cartReducer from "../features/cart/cartSlice.js";

//we will create a store that will contain the state of the products, we will use the productReducer to change the state of the products
export const store = configureStore({
    reducer: {
        products: productReducer,
        user: userReducer,
        cart: cartReducer
    }
})