import { useSelector } from "react-redux";
import { BLOCK_PX_SIZE, BOARD_BLOCK_HEIGHT, BOARD_BLOCK_WIDTH } from "../constents";

import Board from "./board";
import Block from "./block";
import { boardBlocksMatrixSelector, iterateBlocks } from "../store/boardSlice";

function PixelBoard(props) {
  const blocks = useSelector(boardBlocksMatrixSelector);
  console.log(blocks)
    return (
    <Board
        height={BOARD_BLOCK_HEIGHT * BLOCK_PX_SIZE + 'px'}
        width={BOARD_BLOCK_WIDTH * BLOCK_PX_SIZE + 'px'}
      >

        {
           Array.from(iterateBlocks(blocks),
            ({block_x,block_y,color})=>(<Block key={`${block_x},${block_y}`} block_x = {block_x} block_y = {block_y} color={color}  />)
           ) 
        }
    </Board>
  );
}

export default PixelBoard;
