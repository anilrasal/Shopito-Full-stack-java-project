import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getOrdersByUserId,
  getUserOrders,
  placeOrderfromCart,
  placeOrderFromUserCart,
} from "../../services/orderService";

// Async thunk to place order from cart(old)
export const placeOrderFromCartByUserId = createAsyncThunk(
  "order/placeOrderfromCart",
  async (userID, { rejectWithValue }) => {
    try {
      const response = await placeOrderfromCart(userID);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

//Async thunk to place order from cart(new)
export const placeOrderFromUserCartThunk = createAsyncThunk(
  "order/placeOrderfromCartThunk",
  async (_, { rejectWithValue }) => {
    try {
      const response = await placeOrderFromUserCart();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchUserOrders = createAsyncThunk(
  "orders/fetchUserOrders",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await getOrdersByUserId(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data || "Failed to fetch Orders " + error.message
      );
    }
  }
);

export const fetchUserOrdersWithAuth = createAsyncThunk(
  "orders/fetchUserOrdersWithAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserOrders();
      console.log("Caught in fetchUserOrdersWithAuth");
      return response.data;
    } catch (error) {
      console.log("error is", error);
      return rejectWithValue(
        error.response.data || "Failed to fetch Ordres" + error.message
      );
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: null,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    userOrders: [],
  },
  reducers: {
    resetOrderState: (state) => {
      state.order = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrderFromCartByUserId.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(placeOrderFromCartByUserId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.order = action.payload;
        console.log("Order placed successfully:", action.payload);
      })
      .addCase(placeOrderFromCartByUserId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userOrders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchUserOrdersWithAuth.pending, (state) => {
        state.status = "loading";
        state.error = null;
        console.log("Inside pending");
      })
      .addCase(fetchUserOrdersWithAuth.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.userOrders = action.payload;
        console.log("Inside fulfilled");
      })
      .addCase(fetchUserOrdersWithAuth.rejected, (state, action) => {
        state.status = "failed";
        console.log("Inside rejected");
        state.error = action.payload || action.error.message;
      })
      .addCase(placeOrderFromUserCartThunk.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(placeOrderFromUserCartThunk.fulfilled, (state, action) => {
        state.error = null;
        state.status = "succeeded";
        state.order = action.payload;
      })
      .addCase(placeOrderFromUserCartThunk.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        state.status = "failed";
        state.userOrders = [];
        state.order = null;
      });
  },
});

export const { resetOrderState } = orderSlice.actions;

export default orderSlice.reducer;
