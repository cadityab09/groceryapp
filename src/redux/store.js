import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products/productSlice";
import categoriesReducer from "../features/products/categoriesSlice";
import cartReducer from "../features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    categories: categoriesReducer,
    cart: cartReducer,
  }
});

export default store;
