import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/config";
export const product_add = createAsyncThunk(
  "product/product_add",
  async (product, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.post(
        `${base_url}/api/product/add`,
        product,
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_products = createAsyncThunk(
  "product/get_products",
  async (
    { perPage, page, searchValue },
    { rejectWithValue, fulfillWithValue, getState }
  ) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${base_url}/api/products/get?page=${page}&&searchValue=${searchValue}&&perPage=${perPage}`,
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_product = createAsyncThunk(
  "product/get_product",
  async (productId, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${base_url}/api/product/get/${productId}`,
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const update_product = createAsyncThunk(
  "product/update_product",
  async (product, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.post(
        `${base_url}/api/product/update`,
        product,
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const product_Image_update = createAsyncThunk(
  "product/product_Image_update",
  async (
    { oldImage, newImage, productId },
    { rejectWithValue, fulfillWithValue, getState }
  ) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const formData = new FormData();
      formData.append("oldImage", oldImage);
      formData.append("newImage", newImage);
      formData.append("productId", productId);
      const { data } = await axios.post(
        `${base_url}/api/product/image/update`,
        formData,
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const productReducer = createSlice({
  name: "product",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    products: [],
    product: "",
    totalProduct: 0,
  },
  reducers: {
    messageClear: (state, _) => {
      state.successMessage = "";
      state.errorMessage = "";
    },
  },
  extraReducers: {
    [product_add.pending]: (state, _) => {
      state.loader = true;
    },
    [product_add.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.successMessage = payload.message;
    },
    [product_add.rejected]: (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.error;
    },
    [get_products.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.totalProduct = payload.totalProducts;
      state.products = payload.products;
    },
    [get_product.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.successMessage = payload.message;
      state.product = payload.product;
    },
    [update_product.pending]: (state, _) => {
      state.loader = true;
    },
    [update_product.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.successMessage = payload.message;
    },
    [update_product.rejected]: (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.error;
    },
    [product_Image_update.fulfilled]: (state, { payload }) => {
      state.successMessage = payload.message;
      state.product = payload.product;
    },
  },
});
export const { messageClear } = productReducer.actions;
export default productReducer.reducer;
