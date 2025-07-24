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
import PixelBoard from './components/pixelBoard.jsx';
import { set_blocks,remove_blocks } from './store/boardSlice.js';
import { useEffect } from 'react';

function App() {
  
  const dispatch = useDispatch()
  
  useEffect(() => {
  setTimeout(()=>{dispatch(remove_blocks([{block_x:1,block_y:0, color:1},{block_x:2,block_y:1, color:1},{block_x:1,block_y:3, color:3}]))},5000)})
  return (
      <PixelBoard/>
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
