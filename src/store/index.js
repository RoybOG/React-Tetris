import { configureStore } from '@reduxjs/toolkit';
import boardReducer from './boardSlice';
import scoreReducer from './scoreSlice';
import {enableMapSet} from "immer"

enableMapSet()


export const store = configureStore({
  reducer: {
    board: boardReducer,
    score: scoreReducer,
  },
});

export default store;
