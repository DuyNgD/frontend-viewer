import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_REVIEW_LIST_BY_RESTAURANT_ID } from "../../API/APIs";
import { request } from "../../Constants/Constants";

interface State {
  list: [][];
  isLoading: boolean;
}

const initialState: State = {
  list: [],
  isLoading: true,
};

export const fetchReviewList = createAsyncThunk(
  "review/fetchReviewList",
  async (restaurantId: string) => {
    const response = await request({
      url: API_REVIEW_LIST_BY_RESTAURANT_ID + restaurantId,
      method: "GET",
    });

    return response.data;
  }
);

const slice = createSlice({
  name: "Review Reducer",
  initialState,
  reducers: {
    resetReviewList: (state) => {
      state.list = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviewList.pending, (state) => {
        state.list = [];
        state.isLoading = true;
      })
      .addCase(fetchReviewList.fulfilled, (state, action) => {
        state.list = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchReviewList.rejected, (state) => {
        state.list = [];
        state.isLoading = false;
      });
  },
});

export const { resetReviewList } = slice.actions;

export default slice.reducer;
