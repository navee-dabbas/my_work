import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/product";
import categorySlice from "../store/categorySlice";
import cartSlice from "./slices/cart";

export const store = configureStore({
  reducer: {
    productSlice,
    categorySlice,
    cartSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
