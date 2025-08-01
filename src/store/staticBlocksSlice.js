import { createSelector, createSlice } from '@reduxjs/toolkit';
import { BOARD_BLOCK_HEIGHT, BOARD_BLOCK_WIDTH } from '../constents';
import { MatrixMethods,newMatrix } from '../matrixUtils';
// import { , newMatrix, removeBlocks, setBlocks } from '../matrixUtils';




/*const initialState = {
  board_blocks_matrix: {
    blocks:{
    1:{19:2},
    2:{19:2,18:2},
    3:{19:2}
    },
    hello:function(p){console.log(p)},
    
  },
    
};*/


const initialState = {
  board_blocks_matrix: newMatrix([{block_x:1, block_y:19, color:2},{block_x:2, block_y:19, color:2},{block_x:3, block_y:19, color:2},{block_x:2, block_y:18, color:2}])
}





console.log(JSON.stringify(initialState))

/*console.log(Array.from(initialState.board_blocks_matrix.iterateBlocks(19)))*/

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



export const boardBlocksMatrixSelector = (state)=>(state.staticBlocks.board_blocks_matrix.blocks)

/*export const boardBlocksSelector = createSelector([boardBlocksMapSelector],(blocks)=>(Array.from(blocks.entries().map(([k,v])=>([JSON.parse(k),v])))))*/

/*export function* iterateBlocks(blocks_matrix){
    for(let [block_x, ys_in_x ] of Object.entries( blocks_matrix)){
      for(let [block_y,color ] of Object.entries( ys_in_x)){
        yield ({block_x,block_y,color});
      }
    }
}*/

export const {clear_board,remove_blocks,set_blocks} = boardSlice.actions;
export default boardSlice.reducer;


 /*new Map([[JSON.stringify([1, 0]), 2],[JSON.stringify([2, 1]), 2],[JSON.stringify([2, 2]), 2]]) new Array(BOARD_BLOCK_HEIGHT)
    .fill(null)
    .map((row) => new Array(BOARD_BLOCK_WIDTH).fill(0))*/