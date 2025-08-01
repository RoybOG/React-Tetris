import { useSelector } from "react-redux";
import { BLOCK_PX_SIZE, BOARD_BLOCK_HEIGHT, BOARD_BLOCK_WIDTH } from "../constents";

import Block from "./block";
import { boardBlocksMatrixSelector } from "../store/staticBlocksSlice";
import {  MatrixMethods } from "../matrixUtils";

function StaticBlocks(props) {
  const blocks = useSelector(boardBlocksMatrixSelector);
  console.log(blocks)
  return (<>
        {
           Array.from(MatrixMethods.iterateBlocks.call(blocks),
            ({block_x,block_y,color})=>(<Block key={`${block_x},${block_y}`} block_x = {block_x} block_y = {block_y} color={color}  />)
           ) 
        }
  </>);
}

export default StaticBlocks;
