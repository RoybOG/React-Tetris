import { configureStore } from '@reduxjs/toolkit';
import boardReducer from './staticBlocksSlice';
import scoreReducer from './scoreSlice';
import {enableMapSet} from "immer"



export const store = configureStore({
  reducer: {
    staticBlocks: boardReducer,
    score: scoreReducer,
  },
});

export default store;
