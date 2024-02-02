import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/config";
export const get_seller_payment_details = createAsyncThunk(
  "payment/get_seller_payment_details",
  async (sellerId, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${base_url}/api/payment/seller-payment-details/${sellerId}`,
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const send_widthraw_request = createAsyncThunk(
  "payment/send_widthraw_request",
  async (info, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.post(
        `${base_url}/api/payment/send-widthraw-request`,
        info
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const get_payment_request = createAsyncThunk(
  "payment/get_payment_request",
  async (_, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${base_url}/api/payment/get-admin-payment-request`,
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const confirm_payment_request = createAsyncThunk(
  "payment/confirm_payment_request",
  async (paymentId, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.post(
        `${base_url}/api/payment/confirm_payment_request`,
        { paymentId },
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const paymentReducer = createSlice({
  name: "payment",
  initialState: {
    errorMessage: "",
    loader: false,
    pendingWidthraw: [],
    successWidthraw: [],
    totalAmount: 0,
    widthrawAmount: 0,
    pendingAmount: 0,
    availableAmount: 0,
    successMessage: "",
  },
  reducers: {
    messageClear: (state, _) => {
      state.successMessage = "";
      state.errorMessage = "";
    },
  },
  extraReducers: {
    [get_seller_payment_details.fulfilled]: (state, { payload }) => {
      state.pendingWidthraw = payload.pendingWidthraw;
      state.totalAmount = payload.totalAmount;
      state.pendingAmount = payload.pendingAmount;
      state.widthrawAmount = payload.widthrawAmount;
      state.availableAmount = payload.availableAmount;
      state.successWidthraw = payload.successWidthraw;
    },
    [send_widthraw_request.pending]: (state, _) => {
      state.loader = true;
    },
    [send_widthraw_request.rejected]: (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.message;
    },
    [send_widthraw_request.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.successMessage = payload.message;
      state.pendingWidthraw = [...state.pendingWidthraw, payload.widthraw];
      state.availableAmount = state.availableAmount - payload.widthraw.amount;
      state.pendingAmount = payload.widthraw.amount;
    },
    [get_payment_request.fulfilled]: (state, { payload }) => {
      state.pendingWidthraw = payload.widthrawRequest;
    },
    [confirm_payment_request.pending]: (state, _) => {
      state.loader = true;
    },
    [confirm_payment_request.rejected]: (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.message;
    },
    [confirm_payment_request.fulfilled]: (state, { payload }) => {
      const temp = state.pendingWidthraw.filter(
        (r) => r._id !== payload.payment._id
      );
      state.loader = false;
      state.successMessage = payload.message;
      state.pendingWidthraw = temp;
    },
  },
});
export const { messageClear } = paymentReducer.actions;
export default paymentReducer.reducer;
