import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TProductSlice } from "../../../type/product.type";

type ProductState = {
  items: TProductSlice[];
  totalQuantity: number;
  totalPrice: number;
};

const initialState: ProductState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const productSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item._id === action.payload._id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      state.totalQuantity += action.payload.quantity;
      state.totalPrice += action.payload.price * action.payload.quantity;
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.items.find((item) => item._id == itemId);

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.price * existingItem.quantity;
        state.items = state.items.filter((item) => item._id !== itemId);
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ _id: string; quantity: number }>
    ) => {
      const { _id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item._id === _id);
      if (existingItem && quantity > 0) {
        const quantityDifference = quantity - existingItem.quantity;
        existingItem.quantity = quantity;
        state.totalQuantity += quantityDifference;
        state.totalPrice += quantityDifference * existingItem.price;
      }
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  productSlice.actions;

export default productSlice.reducer;
