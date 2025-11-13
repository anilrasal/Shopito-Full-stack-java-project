import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice.js";
import searchReducer from "../features/search/searchSlice.js";
import productReducer from "../features/product/productSlice.js";
import orderReducer from "../features/order/orderSlice.js";
import themeReducer from "../features/theme/themeSlice.js";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    search: searchReducer,
    products: productReducer,
    order: orderReducer,
    theme: themeReducer,
  },
});
