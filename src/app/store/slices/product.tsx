import { createSlice } from "@reduxjs/toolkit";

interface ProductSlice {
  name: string;
  category: string;
  qty: number;
}
const initialState: ProductSlice[] = [
  { name: "Shoes", category: "Reebok", qty: 2 },
  { name: "Jogger", category: "Service", qty: 4 },
  { name: "Snakers", category: "Aerosoft", qty: 5 },
];

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.push(action.payload);
    },
    deleteProduct: (state, action) => {},
  },
});
export const { addProduct, deleteProduct } = productSlice.actions;

export default productSlice.reducer;
