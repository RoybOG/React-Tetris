import { createSlice } from '@reduxjs/toolkit';
import { TetrominoStructures } from '../utils/tetrominoUtils';
import { pickFromArr, pickNumberUpTo } from '../utils/utils';
import { COLORS } from '../constents';


const initialState = {
  NextTetrominos: [] ,
};



export const scoreSlice = createSlice({
  name: 'stack',
  initialState,
  reducers: {
    generateNextTetromino: (state) => {
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
