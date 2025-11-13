import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllProducts,
  searchProducts,
} from "../../../services/productService";
import mapSearchApiToUi from "../../../mapper/mapSearchApiToUi";

// This file contains the thunk for fetching search suggestions based on a query
// It uses createAsyncThunk from Redux Toolkit to handle asynchronous actions
export const fetchSuggestions = createAsyncThunk(
  "search/fetchSuggestions",
  async (query, { rejectWithValue }) => {
    try {
      const response = await searchProducts(query);
      // Fetch suggestions based on the query
      // Check if the response is successful
      if (response.status !== 200) {
        throw new Error("Failed to fetch suggestions");
      }
      const data = mapSearchApiToUi(response.data); //This is to map to ui
      return data; // Return the fetched suggestions
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSearchResults = createAsyncThunk(
  "search/fetchSearchResults",
  async (query, { rejectWithValue }) => {
    try {
      const response = await searchProducts(query);
      if (response.status !== 200) {
        throw new Error("Failed to fetch search results");
      }
      const data = mapSearchApiToUi(response.data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
