import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addItemToCart,
  clearCartItems,
  getItemFromCartByUserId,
  getItemFromCartWithAuth,
  updateOrAddItemToCart,
} from "../../services/cartService";

import API from "../../services/api";

export const addCartItem = createAsyncThunk(
  "cart/addCartItem",
  async (itemData, thunkAPI) => {
    try {
      const response = await addItemToCart(itemData);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Add failed");
    }
  }
);

export const addOrUpdateCartItem = createAsyncThunk(
  "cart/updateOrAddCartItem",
  async (itemData, thunkAPI) => {
    console.log("dispatching cart update", itemData);
    try {
      const response = await updateOrAddItemToCart(itemData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Update failed");
    }
  }
);

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (userId, thunkAPI) => {
    try {
      const response = await getItemFromCartByUserId(userId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Fetch failed");
    }
  }
);

export const fetchCartItemsWithAuth = createAsyncThunk(
  "cart/fetchCartItemsWithAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getItemFromCartWithAuth();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Fetch Failed");
    }
  }
);

export const decrementCartItem = createAsyncThunk(
  "cart/decrementCartItem",
  async ({ userId, productId }, thunkAPI) => {
    try {
      const response = await API.put("/cart-items/decrement", {
        userId,
        productId,
      });
      // If item was deleted, backend may return null
      if (!response.data || !response.data.productDTO) {
        return { deleted: true, productId }; // signal to reducer
      }
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Decrement failed");
    }
  }
);

export const incrementCartItem = createAsyncThunk(
  "cart/incrementCartItem",
  async ({ userId, productId }, thunkAPI) => {
    try {
      const response = await API.put("/cart-items/increment", {
        productId,
        userId,
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Decrement failed");
    }
  }
);

export const removeItemFromCart = createAsyncThunk(
  "cart/removeItemFromCart",
  async (itemId, thunkAPI) => {
    try {
      const response = await API.delete(`/cart-items/${itemId}`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Remove failed");
    }
  }
);

export const removeCartItems = createAsyncThunk(
  "cart/removeCartItems",
  async (userId, thunkAPI) => {
    try {
      const response = await clearCartItems(userId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Remove failed");
    }
  }
);

const initialState = {
  items: [], // each item will include { id, name, price, quantity, ... }
  total: 0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //Local-only add (optimistic UI)
    addItem: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      // If quantity is not provided, default to 1
      // If the item already exists, increase its quantity
      const qtyToAdd = Math.max(1, action.payload.quantity ?? 1);

      if (existingItem) {
        existingItem.quantity += qtyToAdd;
      } else {
        const qty = qtyToAdd > 0 ? qtyToAdd : 1; // Ensure quantity is at least 1
        state.items.push({ ...action.payload, quantity: qtyToAdd });
      }

      state.total += action.payload.price * qtyToAdd;
      state.totalQuantity += qtyToAdd;
    },
    removeItem: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        const item = state.items[index];

        state.total -= item.price;
        state.totalQuantity -= 1;

        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items.splice(index, 1);
        }
      }
    },
    removeAll: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (index !== -1) {
        const item = state.items[index];
        state.total -= item.price * item.quantity;
        state.totalQuantity -= item.quantity;
        state.items.splice(index, 1);
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.totalQuantity = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // ⏳ Fetch Cart Items
      .addCase(fetchCartItemsWithAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartItemsWithAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const rowItems = action.payload ?? []; // Ensure it's an array
        // Map API cart items to UI format

        const mappedItems = rowItems
          .map((cartItem) => {
            const product = cartItem.productDTO;
            if (!product) {
              console.warn("Missing productDTO in cart item:", cartItem);
              return null; // or skip this item entirely
            }
            return {
              id: product.id,
              name: product.name,
              cartItemId: cartItem.id,
              userId: cartItem.userId,
              price: product.price,
              quantity: cartItem.quantity,
              description: product.description,
              category: product.category,
              stock: product.availableStock,
              image: [
                { original: product.imageUrl, thumbnail: product.imageUrl },
                { original: product.imageUrl, thumbnail: product.imageUrl },
                { original: product.imageUrl, thumbnail: product.imageUrl },
              ],
              rating: 4.5, // default until you wire up real ratings
            };
          })
          .filter(Boolean); // Remove any null items

        state.items = mappedItems;
        state.total = mappedItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        state.totalQuantity = mappedItems.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
      })
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.loading = false;

        const rowItems = action.payload ?? []; // Ensure it's an array
        // Map API cart items to UI format

        const mappedItems = rowItems
          .map((cartItem) => {
            const product = cartItem.productDTO;
            if (!product) {
              console.warn("Missing productDTO in cart item:", cartItem);
              return null; // or skip this item entirely
            }
            return {
              id: product.id,
              name: product.name,
              cartItemId: cartItem.id,
              userId: cartItem.userId,
              price: product.price,
              quantity: cartItem.quantity,
              description: product.description,
              category: product.category,
              stock: product.availableStock,
              image: [
                { original: product.imageUrl, thumbnail: product.imageUrl },
                { original: product.imageUrl, thumbnail: product.imageUrl },
                { original: product.imageUrl, thumbnail: product.imageUrl },
              ],
              rating: 4.5, // default until you wire up real ratings
            };
          })
          .filter(Boolean); // Remove any null items

        state.items = mappedItems;
        state.total = mappedItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        state.totalQuantity = mappedItems.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
      })
      .addCase(fetchCartItemsWithAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching cart items";
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching cart items";
      })

      // ➕ Add Item to Cart(Backend)
      .addCase(addCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        state.loading = false;
        const cartItem = action.payload;
        const product = cartItem.productDTO;
        if (!product) {
          return;
        } // Ensure product exists

        const existing = state.items.find((item) => item.id === product.id);
        const qtyToAdd = Math.max(1, cartItem.quantity ?? 1);

        if (existing) {
          existing.quantity += qtyToAdd;
        } else {
          state.items.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: qtyToAdd,
            description: product.description,
            category: product.category,
            stock: product.availableStock,
            image: [
              { original: product.imageUrl, thumbnail: product.imageUrl },
              { original: product.imageUrl, thumbnail: product.imageUrl },
              { original: product.imageUrl, thumbnail: product.imageUrl },
            ],
          });
        }

        state.total += product.price * qtyToAdd; //total price as per the quantity.
        state.totalQuantity += qtyToAdd;
      })
      .addCase(addCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error adding item to cart";
      })
      .addCase(incrementCartItem.fulfilled, (state, action) => {
        const cartItem = action.payload;
        const product = cartItem.productDTO;
        if (!product) {
          return;
        }

        const existing = state.items.find((item) => item.id === product.id);
        if (existing) {
          existing.quantity += 1;
          state.total += product.price;
          state.totalQuantity += 1;
        }
      })
      .addCase(incrementCartItem.rejected, (state, action) => {
        state.error = action.payload || "Error incrementing cart item";
      })
      .addCase(decrementCartItem.fulfilled, (state, action) => {
        const cartItem = action.payload;
        const product = cartItem.productDTO;
        if (!product) {
          return;
        }

        const existing = state.items.find((item) => item.id === product.id);
        if (existing) {
          if (existing.quantity > 1) {
            existing.quantity -= 1;
            state.total -= product.price;
            state.totalQuantity -= 1;
          } else {
            // If quantity is 1, remove the item from cart
            state.items = state.items.filter((item) => item.id !== product.id);
            state.total -= product.price;
            state.totalQuantity -= 1;
          }
        }
      })
      .addCase(decrementCartItem.rejected, (state, action) => {
        state.error = action.payload || "Error decrementing cart item";
      })
      .addCase(incrementCartItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(decrementCartItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.loading = false; // Reset loading state

        const itemId = action.meta.arg; // Get the item ID from the action meta
        const cartItem = action.payload;
        console.log("Cart Item details: ", cartItem);
        if (!cartItem || !cartItem.productDTO) {
          state.items = state.items.filter(
            (item) => item.cartItemId !== itemId
          );
          return;
        }

        const product = cartItem.productDTO;
        const existing = state.items.find((item) => item.id === product.id);

        if (existing) {
          state.total -= existing.price * existing.quantity;
          state.totalQuantity -= existing.quantity;
          state.items = state.items.filter((item) => item.id !== product.id);
        }
      })
      .addCase(removeItemFromCart.rejected, (state, action) => {
        state.error = action.payload || "Error removing cart item";
      })
      .addCase(removeItemFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCartItems.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.items = [];
        state.total = 0;
        state.totalQuantity = 0;
      })
      .addCase(removeCartItems.rejected, (state, action) => {
        state.error = action.payload || "Error clearing cart items";
        state.loading = false;
      })
      .addCase(addOrUpdateCartItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(addOrUpdateCartItem.fulfilled, (state, action) => {
        state.loading = false;
        const cartItem = action.payload;
        const product = cartItem.productDTO;
        if (!product) {
          return;
        } // Ensure product exists

        const existing = state.items.find((item) => item.id === product.id);
        const qtyToSet = Math.max(1, cartItem.quantity ?? 1);

        if (existing) {
          // Adjust total based on difference in quantity
          const qtyDiff = qtyToSet - existing.quantity;
          existing.quantity = qtyToSet;
          state.total += product.price * qtyDiff;
          state.totalQuantity += qtyDiff;
        } else {
          state.items.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: qtyToSet,
            description: product.description,
            category: product.category,
            stock: product.availableStock,
            image: [
              { original: product.imageUrl, thumbnail: product.imageUrl },
              { original: product.imageUrl, thumbnail: product.imageUrl },
              { original: product.imageUrl, thumbnail: product.imageUrl },
            ],
          });
          state.total += product.price * qtyToSet; //total price as per the quantity.
          state.totalQuantity += qtyToSet;
        }
      })
      .addCase(addOrUpdateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error updating/adding cart item";
      });
  },
});

export const { addItem, removeItem, removeAll, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
