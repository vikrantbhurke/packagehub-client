import { createSlice } from "@reduxjs/toolkit";

export interface UserState {}

const initialState: UserState = {};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export const {} = userSlice.actions;
export default userSlice.reducer;
