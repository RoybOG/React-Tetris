import { createSelector, createSlice } from '@reduxjs/toolkit';
import { BOARD_BLOCK_HEIGHT, BOARD_BLOCK_WIDTH } from '../constents';

const initialState = {
  board_blocks: new Map([[JSON.stringify([1, 0]), 2],[JSON.stringify([2, 1]), 2],[JSON.stringify([2, 2]), 2]]) /*new Array(BOARD_BLOCK_HEIGHT)
    .fill(null)
    .map((row) => new Array(BOARD_BLOCK_WIDTH).fill(0))*/,
};
console.log(initialState)
export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    clear_board: (state) => {
      state.board_blocks.clear();
    },
    add_pixel: (state, action) => {
      state.board_blocks.set(
        JSON.stringify(action.payload.coordinates),
        action.payload.colorIndex
      );
    },
  },
});

export const {clear_board,add_pixel} = boardSlice.actions;

export const boardBlocksMapSelector = (state)=>(state.board.board_blocks)

export const boardBlocksSelector = createSelector([boardBlocksMapSelector],(blocks)=>(Array.from(blocks.entries().map(([k,v])=>([JSON.parse(k),v])))))


export default boardSlice.reducer;
