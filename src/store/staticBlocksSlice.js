import { createSelector, createSlice } from '@reduxjs/toolkit';
import { BOARD_BLOCK_HEIGHT, BOARD_BLOCK_WIDTH } from '../constents';
import { MatrixMethods,newMatrix } from '../utils/matrixUtils';


const initialState = {
  board_blocks_matrix: newMatrix([{block_x:1, block_y:19, color:2},{block_x:2, block_y:19, color:2},{block_x:3, block_y:19, color:2},{block_x:2, block_y:18, color:2}])
}


export const boardSlice = createSlice({
  name: 'staticBlocks',
  initialState,
  reducers: {
    clear_board: (state) => {
      state.board_blocks_matrix = newMatrix();
    },
    set_blocks: (state, action) => {
      MatrixMethods.setBlocks.call(state.board_blocks_matrix, action.payload)
    },
  remove_blocks: (state, action) => {
     MatrixMethods.removeBlocks.call(state.board_blocks_matrix, action.payload)
    }
    },
});

export const boardBlocksMatrixSelector = (state)=>(state.staticBlocks.board_blocks_matrix)

export const {clear_board,remove_blocks,set_blocks} = boardSlice.actions;
export default boardSlice.reducer;


