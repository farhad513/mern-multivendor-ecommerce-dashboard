import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
import axios from "axios";

export const get_seller_request = createAsyncThunk(
  "seller/get_seller_request",
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
        `${base_url}/api/seller/get/request?page=${page}&&searchValue=${searchValue}&&perPage=${perPage}`,
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_seller = createAsyncThunk(
  "seller/get_seller",
  async (sellerId, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${base_url}/api/get/seller/${sellerId}`,
        config
      );
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_sellers = createAsyncThunk(
  "seller/get_sellers",
  async (
    { page, searchValue, perPage },
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
        `${base_url}/api/get/sellers?page=${page}&&searchValue=${searchValue}&&perPage=${perPage}`,
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_deactive_seller = createAsyncThunk(
  "seller/get_deactive_seller",
  async (
    { page, searchValue, perPage },
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
        `${base_url}/api/get/deactive-seller?page=${page}&&searchValue=${searchValue}&&perPage=${perPage}`,
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const seller_status_update = createAsyncThunk(
  "seller/seller_status_update",
  async (info, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.post(
        `${base_url}/api/seller/status/update`,
        info,
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const create_stripe_account = createAsyncThunk(
  "seller/create_stripe_account",
  async () => {
    try {
      const {
        data: { url },
      } = await api.get(`${base_url}/api/payment/create-stipe-account`, {
        withCredentials: true,
      });
      window.location.href = url;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const active_stripe_account = createAsyncThunk(
  "seller/active_stripe_account",
  async (activeCode, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `${base_url}/api/payment/active-stipe-account/${activeCode}`,
        {},
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const sellerReducers = createSlice({
  name: "seller",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    sellers: [],
    totalSeller: 0,
  },
  reducers: {
    messageClear: (state, _) => {
      state.successMessage = "";
      state.errorMessage = "";
    },
  },
  extraReducers: {
    [get_seller_request.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.sellers = payload.sellers;
      state.totalSeller = payload.totalSeller;
    },
    [get_seller.fulfilled]: (state, { payload }) => {
      state.seller = payload.seller;
    },

    [seller_status_update.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.seller = payload.seller;
      state.successMessage = payload.message;
    },
    [get_sellers.fulfilled]: (state, { payload }) => {
      state.sellers = payload.sellers;
      state.totalSeller = payload.totalSeller;
    },
    [get_deactive_seller.fulfilled]: (state, { payload }) => {
      state.sellers = payload.sellers;
      state.totalSeller = payload.totalSeller;
    },
    [active_stripe_account.pending]: (state, { payload }) => {
      state.loader = true;
    },
    [active_stripe_account.rejected]: (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.error;
    },
    [active_stripe_account.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.successMessage = payload.message;
    },
  },
});
export const { messageClear } = sellerReducers.actions;
export default sellerReducers.reducer;
