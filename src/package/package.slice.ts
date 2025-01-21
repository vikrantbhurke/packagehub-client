import { Order } from "@/global/enums";
import { Platform, Sort } from "./enums";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface PackageState {
  page: number;
  platform: Platform;
  search: string;
  sort: Sort;
  order: Order;
  rating: string;
}

const initialState: PackageState = {
  page: 1,
  platform: Platform.Npm,
  search: "",
  sort: Sort.Rating,
  order: Order.Descending,
  rating: "0",
};

export const packageSlice = createSlice({
  name: "package",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setPlatform: (state, action: PayloadAction<Platform>) => {
      state.platform = action.payload;
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
  },
});

export const { setPage, setPlatform, setSearch, setSort, setOrder, setRating } =
  packageSlice.actions;

export default packageSlice.reducer;
