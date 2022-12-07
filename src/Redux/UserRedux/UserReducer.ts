import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { API_USER_FIND_BY_ID, API_USER_LOGOUT } from "../../API/APIs";
import { Cookies, request } from "../../Constants/Constants";

interface State {
  accessToken: string | null;
  userData: any | null;
  userLikedReview: [][];
  isLogoutLoading: boolean;
}

const initialState: State = {
  accessToken: null,
  userData: null,
  userLikedReview: [],
  isLogoutLoading: false,
};

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await request({
        url: API_USER_FIND_BY_ID + userId,
        method: "GET",
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const userLogout = createAsyncThunk(
  "user/userLogout",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await request({
        url: API_USER_LOGOUT,
        method: "POST",
        accessToken: payload.accessToken,
      });

      payload.callback();

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const slice = createSlice({
  name: "User Reducer",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    resetUserLikedReview: (state) => {
      state.userLikedReview = [];
    },
  },
  extraReducers: (builder) => {
    // Fetch user data
    builder
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.userData = action.payload;
      })
      .addCase(fetchUserData.rejected, (state) => {
        Cookies.setCookie("accessToken", "");

        state.accessToken = null;
        state.userData = null;
      });
    // User logout
    builder
      .addCase(userLogout.pending, (state) => {
        state.isLogoutLoading = true;
      })
      .addCase(userLogout.fulfilled, (state) => {
        Cookies.setCookie("accessToken", "");

        state.accessToken = null;
        state.userData = null;
        state.isLogoutLoading = false;
      })
      .addCase(userLogout.rejected, (state) => {
        Cookies.setCookie("accessToken", "");

        state.accessToken = null;
        state.userData = null;
        state.isLogoutLoading = false;
      });
  },
});

export const { setAccessToken } = slice.actions;

export default slice.reducer;
