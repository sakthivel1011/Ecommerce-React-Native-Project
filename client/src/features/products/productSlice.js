import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

const initialState = {
  products: [],
  product: { reviews: [] },
  loading: false,
  error: null,
  pages: 1,
  page: 1,
};

export const listProducts = createAsyncThunk(
  "products/list",
  async (
    { keyword = "", pageNumber = "", category = "" },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/products?keyword=${keyword}&pageNumber=${pageNumber}&category=${category}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const listProductDetails = createAsyncThunk(
  "products/details",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/products/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearProductDetails: (state) => {
      state.product = { reviews: [] };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(listProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.pages = action.payload.pages;
        state.page = action.payload.page;
      })
      .addCase(listProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(listProductDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(listProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(listProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProductDetails } = productSlice.actions;
export default productSlice.reducer;
