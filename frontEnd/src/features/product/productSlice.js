import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllProducts, getProductById } from "../../services/productService";
import mapApiToUi from "../../mapper/mapApiToUi";
import mapProductToUi from "../../mapper/mapProductToUi";

// Async thunk for fetching + mapping API data
export const fetchProducts = createAsyncThunk(
  "products/featchAll",
  async (query, { rejectWithValue }) => {
    try {
      const response = await getAllProducts(query); //Axios/fetch call
      return mapApiToUi(response.data); //map to UI shape
    } catch (err) {
      return rejectWithValue(err.message || "Fetch failed");
    }
  }
);

export const selectProductById = (state) => state.products.selectedProduct;

export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getProductById(id); //Axios call
      return mapProductToUi(response.data);
    } catch (err) {
      return rejectWithValue(err.message || "Fetch by ID failed");
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [], // UIMockProduct[]
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    selectedCategory: "",
    selectedProduct: null, // For product details page
    //Pagination info from backend
    page: 0,
    totalPages: 1,
    totalElements: 0,
    size: 20,
  },
  reducers: {
    setCategory(state, action) {
      state.selectedCategory = action.payload;
    },
    clearCategory(state) {
      state.selectedCategory = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.items;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
        state.totalElements = action.payload.totalElements;
        state.size = action.payload.size;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = "succeeded";
        const fetchedProduct = action.payload;

        // Check if product already exists in items array
        const existingProductIndex = state.items.findIndex(
          (p) => p.id === fetchedProduct.id
        );

        if (existingProductIndex !== -1) {
          //If it's available, update it
          state.items[existingProductIndex] = fetchedProduct; //Update existing item
        } else {
          state.items.push(fetchedProduct); //add a new one
        }

        //Storing seperately in case we need to show details page directly
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setCategory, clearCategory } = productSlice.actions;
export default productSlice.reducer;
