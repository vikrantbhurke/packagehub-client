import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Sort } from "./enums";
import { Order } from "@/global/enums";

export interface ReviewState {
  page: number;
  pkg: string;
  uid: string;
  search: string;
  sort: Sort;
  order: Order;
  rating: string;
  ratingInput: number;
}

const initialState: ReviewState = {
  page: 1,
  pkg: "",
  uid: "",
  search: "",
  sort: Sort.Rating,
  order: Order.Descending,
  rating: "0",
  ratingInput: 3,
};

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setPkg: (state, action: PayloadAction<string>) => {
      state.pkg = action.payload;
    },
    setUid: (state, action: PayloadAction<string>) => {
      state.uid = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setSort: (state, action: PayloadAction<Sort>) => {
      state.sort = action.payload;
    },
    setOrder: (state, action: PayloadAction<Order>) => {
      state.order = action.payload;
    },
    setRating: (state, action: PayloadAction<string>) => {
      state.rating = action.payload;
    },
    setRatingInput: (state, action: PayloadAction<number>) => {
      state.ratingInput = action.payload;
    },
  },
});

export const {
  setPage,
  setPkg,
  setUid,
  setSearch,
  setSort,
  setOrder,
  setRating,
  setRatingInput,
} = reviewSlice.actions;

export default reviewSlice.reducer;
