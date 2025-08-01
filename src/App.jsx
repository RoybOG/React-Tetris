import { useSelector, useDispatch } from 'react-redux';

import './App.css';

import Snake from './components/snake.jsx';
import Board from './components/board.jsx';
import {
  BLOCK_PX_SIZE,
  BOARD_BLOCK_HEIGHT,
  BOARD_BLOCK_WIDTH,
} from './constents';
import Block from './components/block';
import { set_blocks,remove_blocks } from './store/staticBlocksSlice.js';
import { useEffect } from 'react';
import TetrinoSquare from './classes/TetrinoSquare.jsx';
import Tetrino from './classes/Tetrino.jsx';
import StaticBlocks from './components/StaticBlocks.jsx';

function App() {
  
  const dispatch = useDispatch()
  
   useEffect(() => {
   setTimeout(()=>{dispatch(set_blocks([{block_x:4,block_y:19, color:3}]))},5000)})
  return (
    <Board
        height={BOARD_BLOCK_HEIGHT * BLOCK_PX_SIZE + 'px'}
        width={BOARD_BLOCK_WIDTH * BLOCK_PX_SIZE + 'px'}>
          
      <StaticBlocks />
      <TetrinoSquare color= {1}  tetrino_x={3}/>
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
