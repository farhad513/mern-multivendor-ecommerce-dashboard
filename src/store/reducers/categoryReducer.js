import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/config";
export const addCategory = createAsyncThunk(
  "category/addCategory",
  async ({ name, image }, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);
      const { data } = await axios.post(
        `${base_url}/api/category/add`,
        formData,
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_category = createAsyncThunk(
  "category/get_category",
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
        `${base_url}/api/category/get?page=${page}&&searchValue=${searchValue}&&perPage=${perPage}`,
        config
      );

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const categoryReducer = createSlice({
  name: "category",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    categorys: [],
    totalCategory: 0,
  },
  reducers: {
    messageClear: (state, _) => {
      state.successMessage = "";
      state.errorMessage = "";
    },
  },
  extraReducers: {
    [addCategory.pending]: (state, _) => {
      state.loader = true;
    },
    [addCategory.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.successMessage = payload.message;
      state.categorys = [...state.categorys, payload.category];
    },
    [addCategory.rejected]: (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.error;
    },
    [get_category.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.totalCategory = payload.totalCategories;
      state.categorys = payload.categories;
    },
  },
});
export const { messageClear } = categoryReducer.actions;
export default categoryReducer.reducer;
