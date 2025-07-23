import { createSlice } from '@reduxjs/toolkit';
import { BOARD_BLOCK_HEIGHT, BOARD_BLOCK_WIDTH } from '../constents';

const initialState = {
  points: 0,
};

export const scoreSlice = createSlice({
  name: 'score',
  initialState,
  reducers: {
    increment: (state) => {
      state.points += 1;
    },
    decrement: (state) => {
      state.points -= 1;
    },
    incrementByAmount: (state, action) => {
      state.points += action.payload;
    },
    reset: (state) => {
      state.points = 0;
    },
  },
});

export const { increment, decrement, incrementByAmount, reset } =
  scoreSlice.actions;

export default scoreSlice.reducer;
