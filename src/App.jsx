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
import { add_pixel } from './store/boardSlice.js';
import { useEffect } from 'react';

function App() {
  
  const dispatch = useDispatch()
  
  useEffect(() => {
  setTimeout(()=>{dispatch(add_pixel({coordinates:[3,3], color:1}))},5000)})
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
