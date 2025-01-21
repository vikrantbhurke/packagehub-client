import { configureStore } from "@reduxjs/toolkit";
import viewReducer from "./view.slice";
import authReducer from "@/user/auth.slice";
import userReducer from "@/user/user.slice";
import packageReducer from "@/package/package.slice";
import reviewReducer from "@/review/review.slice";
import messageReducer from "@/message/message.slice";

export const store = configureStore({
  reducer: {
    view: viewReducer,
    auth: authReducer,
    user: userReducer,
    package: packageReducer,
    review: reviewReducer,
    message: messageReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
