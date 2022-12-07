import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import appReducer from "./AppRedux/AppReducer";
import userReducer from "./UserRedux/UserReducer";
import reviewReducer from "./ReviewRedux/ReviewReducer";
import emojiReducer from "./EmojiRedux/EmojiReducer";

export const store = configureStore({
  reducer: {
    appReducer,
    userReducer,
    reviewReducer,
    emojiReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
