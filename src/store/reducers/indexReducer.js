import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { base_url } from "../../utils/config";
import axios from "axios";
export const get_seller_dashboard = createAsyncThunk(
  "dashboard/get_seller_dashboard",
  async (_, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${base_url}/api/seller/get-seller-dasboard-data`,
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_admin_dashboard = createAsyncThunk(
  "dashboard/get_admin_dashboard",
  async (_, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${base_url}/api/admin/get-admin-dasboard-data`,
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const indexReducer = createSlice({
  name: "dashboard",
  initialState: {
    totalSale: 0,
    totalOrder: 0,
    totalProduct: 0,
    totalPendingOrder: 0,
    totalSeller: 0,
    recentOrders: [],
    recentMessage: [],
  },
  reducers: {
    messageClear: (state, _) => {
      state.successMessage = "";
      state.errorMessage = "";
    },
  },
  extraReducers: {
    [get_seller_dashboard.fulfilled]: (state, { payload }) => {
      state.totalSale = payload.totalSale;
      state.totalOrder = payload.totalOrder;
      state.totalProduct = payload.totalProudct;
      state.totalPendingOrder = payload.totalPendingOrder;
      state.recentOrders = payload.recentOrders;
      state.recentMessage = payload.messages;
    },
    [get_admin_dashboard.fulfilled]: (state, { payload }) => {
      state.totalSale = payload.totalSale;
      state.totalOrder = payload.totalOrder;
      state.totalProduct = payload.totalProudct;
      state.totalSeller = payload.totalSeller;
      state.recentOrders = payload.recentOrders;
      state.recentMessage = payload.messages;
    },
  },
});
export const { messageClear } = indexReducer.actions;
export default indexReducer.reducer;
