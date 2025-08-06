import { useSelector, useDispatch } from 'react-redux';

import './App.css';

import Board from './components/board.jsx';
import {
  BLOCK_PX_SIZE,
  BOARD_BLOCK_HEIGHT,
  BOARD_BLOCK_WIDTH,
} from './constents';
import Block from './components/block';
import { set_blocks,remove_blocks } from './store/staticBlocksSlice.js';
import { useEffect } from 'react';
import Tetromino from './classes/Tetromino.jsx';
import StaticBlocks from './components/StaticBlocks.jsx';
import { TetrominoStructures } from './utils/tetrominoUtils.js';

function App() {
  
  const dispatch = useDispatch()
  
   useEffect(() => {
    // setTimeout(()=>{dispatch(remove_blocks([{block_x:3, block_y:19}]))},5000)
  })
  return (
    <Board
        height={BOARD_BLOCK_HEIGHT * BLOCK_PX_SIZE + 'px'}
        width={BOARD_BLOCK_WIDTH * BLOCK_PX_SIZE + 'px'}>
          
      <StaticBlocks />
      <Tetromino color= {1}  Tetromino_x={1} Tetromino_y={5} rotations={TetrominoStructures.I}/>
      </Board>
      // <Board
      //   height={BOARD_BLOCK_HEIGHT * BLOCK_PX_SIZE + 'px'}
      //   width={BOARD_BLOCK_WIDTH * BLOCK_PX_SIZE + 'px'}
      // >
      //   <Block block_x={1} />
      //   <Block block_x={2} block_y={1} />
      // </Board>
    
  );
}

export default App;
