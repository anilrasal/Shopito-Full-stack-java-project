import { createSlice } from "@reduxjs/toolkit";
import {
  fetchSearchResults,
  fetchSuggestions,
} from "../../components/navbar/searchBar/searchThunks";

const initialState = {
  query: "",
  suggestions: [],
  searchResults: [],
  status: "idle",
  isLoading: false,
  error: null,
}; // Initial state with an empty query

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload; // Update the query in the state
    },
    clearQuery: (state) => {
      state.query = ""; // Clear the query in the state
    },
    setSuggestions: (state, action) => {
      state.suggestions = action.payload;
    },
    setSearchProducts: (state, action) => {
      state.searchResults = action.payload;
    },
    clearSearchProducts: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuggestions.pending, (state) => {
        state.isLoading = true;
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchSuggestions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "succeeded";
        state.suggestions = action.payload;
        console.log("From Search Slice:", action.payload);
        //state.searchResults = action.payload;
      })
      .addCase(fetchSuggestions.rejected, (state, action) => {
        state.status = "failed";
        state.isLoading = false;
        state.error = action.payload || action.error?.message;
      })
      .addCase(fetchSearchResults.pending, (state) => {
        state.isLoading = true;
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "succeeded";
        state.error = null;
        state.searchResults = action.payload;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.status = "failed";
        state.isLoading = false;
        state.error = action.payload || action.error?.message;
      });
  },
});

export const {
  setQuery,
  clearQuery,
  setSuggestions,
  setSearchProducts,
  clearSearchProducts,
} = searchSlice.actions; // Export the actions for use in components
export default searchSlice.reducer; // Export the reducer to be used in the store
