import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/config";
export const add_banner = createAsyncThunk(
  "banner/add_banner",
  async (info, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.post(
        `${base_url}/api/banner/add`,
        info,
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_banner = createAsyncThunk(
  "banner/get_banner",
  async (productId, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${base_url}/api/banner/get/${productId}`,
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const update_Banner = createAsyncThunk(
  "banner/update_Banner",
  async (
    { bannerId, info },
    { rejectWithValue, fulfillWithValue, getState }
  ) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `${base_url}/api/banner/update/${bannerId}`,
        info,
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const bannerReducer = createSlice({
  name: "banner",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    banners: [],
    banner: "",
    // products: [],
  },
  reducers: {
    messageClear: (state, _) => {
      state.successMessage = "";
      state.errorMessage = "";
    },
  },
  extraReducers: {
    [add_banner.pending]: (state, _) => {
      state.loader = true;
    },
    [add_banner.rejected]: (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.message;
    },
    [add_banner.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.successMessage = payload.message;
      state.banner = payload.cbanner;
    },
    [get_banner.fulfilled]: (state, { payload }) => {
      state.banner = payload.banner;
    },
    [update_Banner.pending]: (state, _) => {
      state.loader = true;
    },
    [update_Banner.rejected]: (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.message;
    },
    [update_Banner.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.successMessage = payload.message;
      state.banner = payload.banner;
    },
  },
});
export const { messageClear } = bannerReducer.actions;
export default bannerReducer.reducer;
