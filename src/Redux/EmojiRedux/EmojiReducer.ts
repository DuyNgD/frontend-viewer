import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_EMOJI_LIST_ALL_BY_RESTAURANT_ID } from "../../API/APIs";
import { request } from "../../Constants/Constants";

interface State {
  list: [][];
  isLoading: boolean;
}

const initialState: State = {
  list: [],
  isLoading: true,
};

export const fetchEmojiList = createAsyncThunk(
  "emoji/fetchList",
  async (restaurantId: string) => {
    const response = await request({
      url: API_EMOJI_LIST_ALL_BY_RESTAURANT_ID + restaurantId,
      method: "GET",
    });

    return response.data;
  }
);

const slice = createSlice({
  name: "Emoji Reducer",
  initialState,
  reducers: {
    resetEmojiList: (state) => {
      state.list = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmojiList.pending, (state) => {
        state.list = [];
        state.isLoading = true;
      })
      .addCase(fetchEmojiList.fulfilled, (state, action) => {
        state.list = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchEmojiList.rejected, (state) => {
        state.list = [];
        state.isLoading = false;
      });
  },
});

export const { resetEmojiList } = slice.actions;

export default slice.reducer;
