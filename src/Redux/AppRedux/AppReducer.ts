import { createSlice } from "@reduxjs/toolkit";

interface State {}

const initialState: State = {};

const slice = createSlice({
  name: "App Reducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

// export const {} = slice.actions;

export default slice.reducer;
