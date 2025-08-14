import { createSelector, createSlice } from '@reduxjs/toolkit';
import { BOARD_BLOCK_HEIGHT, BOARD_BLOCK_WIDTH, gameActions } from '../constents';
import { MatrixMethods,newMatrix } from '../utils/matrixUtils';
import { find_new_max_key, find_new_min_key } from '../utils/utils';


const initialState = {
  board_blocks_matrix: newMatrix([{block_x:3, block_y:19, color:2},{block_x:3, block_y:18, color:2},{block_x:3, block_y:17, color:2},{block_x:3, block_y:16, color:2}, {block_x:3, block_y:15, color:2},{block_x:0, block_y:19, color:2},{block_x:3, block_y:14, color:2}])
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

      state.board_blocks_matrix.maxX = find_new_max_key(state.board_blocks_matrix.blocks, state.board_blocks_matrix.maxX)
      state.board_blocks_matrix.minX = find_new_min_key(state.board_blocks_matrix.blocks, state.board_blocks_matrix.minX, state.board_blocks_matrix.maxX)
      //O(n) but its fine for this game, since block removal only happens during line clearing
    }
    /*clear_line(state, action)=>{
      state.board_blocks_matrix.maxY = state.board_blocks_matrix.maxY-1
    }*/
    },
    extraReducers: (builder)=>{
      builder.addCase(gameActions.reset,(state,action)=>{
        state.board_blocks_matrix = newMatrix();
      }),
      builder.addCase(gameActions.tetrominoLanded, (state,action)=>{
        MatrixMethods.setBlocks.call(state.board_blocks_matrix, action.payload)
      })
    }
});

export const boardBlocksMatrixSelector = (state)=>(state.staticBlocks.board_blocks_matrix)

export const {clear_board,remove_blocks,set_blocks} = boardSlice.actions;
export default boardSlice.reducer;


