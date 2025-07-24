import { createSelector, createSlice } from '@reduxjs/toolkit';
import { BOARD_BLOCK_HEIGHT, BOARD_BLOCK_WIDTH } from '../constents';

const initialState = {
  board_blocks_matrix: {1:{0:2},2:{1:2,2:2}}
  
  /*new Map([[JSON.stringify([1, 0]), 2],[JSON.stringify([2, 1]), 2],[JSON.stringify([2, 2]), 2]]) new Array(BOARD_BLOCK_HEIGHT)
    .fill(null)
    .map((row) => new Array(BOARD_BLOCK_WIDTH).fill(0))*/,
};
console.log(initialState)
export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    clear_board: (state) => {
      state.board_blocks_matrix = {};
    },
    set_blocks: (state, action) => {
      let blocks_to_add;
      let new_ys;
      
      if(Array.isArray(action.payload)){
        blocks_to_add = action.payload
      }else{
        blocks_to_add = [action.payload]
      }

      
      for(let block of blocks_to_add){
        
        new_ys = (state.board_blocks_matrix?.[block.block_x]) || {};
        console.log(new_ys)
        new_ys[block.block_y] = block.color
        state.board_blocks_matrix[block.block_x] = new_ys; 
      }
    },
  remove_blocks: (state, action) => {
      let blocks_to_add;
      let new_ys;
      
      if(Array.isArray(action.payload)){
        blocks_to_add = action.payload
      }else{
        blocks_to_add = [action.payload]
      }


      for(let block of blocks_to_add){

        if(block.block_x in state.board_blocks_matrix){
          delete state.board_blocks_matrix[block.block_x][block.block_y]; 
          if(Object.keys(state.board_blocks_matrix[block.block_x]).length == 0){
            delete state.board_blocks_matrix[block.block_x]
          }
        }
        
      }
    }
    },
});



export const boardBlocksMatrixSelector = (state)=>(state.board.board_blocks_matrix)

/*export const boardBlocksSelector = createSelector([boardBlocksMapSelector],(blocks)=>(Array.from(blocks.entries().map(([k,v])=>([JSON.parse(k),v])))))*/

export function* iterateBlocks(blocks_matrix){
    for(let [block_x, ys_in_x ] of Object.entries( blocks_matrix)){
      for(let [block_y,color ] of Object.entries( ys_in_x)){
        yield ({block_x,block_y,color});
      }
    }
}

export const {clear_board,remove_blocks,set_blocks} = boardSlice.actions;
export default boardSlice.reducer;
