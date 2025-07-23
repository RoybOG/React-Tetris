import { useSelector } from "react-redux";
import { BLOCK_PX_SIZE, BOARD_BLOCK_HEIGHT, BOARD_BLOCK_WIDTH } from "../constents";

import Board from "./board";
import Block from "./block";
import { boardBlocksSelector } from "../store/boardSlice";

function PixelBoard(props) {
  const blocks = useSelector(boardBlocksSelector);
  console.log([...blocks])
    return (
    <Board
        height={BOARD_BLOCK_HEIGHT * BLOCK_PX_SIZE + 'px'}
        width={BOARD_BLOCK_WIDTH * BLOCK_PX_SIZE + 'px'}
      >

        {
           blocks.map(
            ([coard, color])=>(<Block key={`${coard[0]},${coard[1]}`} block_x = {coard[0]} block_y = {coard[1]} color={color}  />)
           ) 
        }
    </Board>
  );
}

export default PixelBoard;
