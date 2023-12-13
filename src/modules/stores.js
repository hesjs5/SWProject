import { configureStore } from "@reduxjs/toolkit";
import { myReducer } from "./reducers";

export const myStore = configureStore({
  reducer: myReducer,
});
