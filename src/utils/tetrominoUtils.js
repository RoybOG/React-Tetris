import { MatrixMethods, newMatrix } from "./matrixUtils";

export function newTetromino(rotationBlocks){
  const rotationMatricies = rotationBlocks.map((blocks)=>{
    let m = newMatrix(blocks)
    m.maxYblocks = Array.from(MatrixMethods.xValuesFromY.call(m, m.maxY)) //used for collision detection
    return m;

  })
  return rotationMatricies;
}

export const TetrominoStructures = {
    O: newTetromino([[{block_x:0, block_y:0},{block_x:1, block_y:0},{block_x:0, block_y:1,},{block_x:1, block_y:1}]]),

    T: newTetromino([[{block_x:0, block_y:0},{block_x:1, block_y:0},{block_x:2, block_y:0,},{block_x:1, block_y:1}],
                      [{block_x:2, block_y:2},{block_x:2, block_y:0},{block_x:1, block_y:1,},{block_x:2, block_y:1}],
                      [{block_x:0, block_y:1},{block_x:1, block_y:1},{block_x:2, block_y:1,},{block_x:1, block_y:0}],
                      [{block_x:0, block_y:2},{block_x:0, block_y:0},{block_x:1, block_y:1,},{block_x:0, block_y:1}],
                      
                      
    ]),
    L: newTetromino([[{block_x:0, block_y:0},{block_x:0, block_y:1},{block_x:0, block_y:2,},{block_x:1, block_y:2}],
                     [{block_x:0, block_y:0},{block_x:1, block_y:0},{block_x:0, block_y:1,},{block_x:2, block_y:0}],
                    [{block_x:2, block_y:0},{block_x:2, block_y:1},{block_x:2, block_y:2,},{block_x:1, block_y:0}],
                  [{block_x:0, block_y:1},{block_x:1, block_y:1},{block_x:2, block_y:1,},{block_x:2, block_y:0}],]),

    J: newTetromino([
      [{block_x:0, block_y:2},{block_x:1, block_y:0},{block_x:1, block_y:1},{block_x:1, block_y:2,}],
      [{block_x:0, block_y:1},{block_x:1, block_y:1},{block_x:2, block_y:1,},{block_x:0, block_y:0}],
      [{block_x:1, block_y:0},{block_x:1, block_y:1},{block_x:1, block_y:2},{block_x:2, block_y:0}],

      [{block_x:0, block_y:1},{block_x:1, block_y:1},{block_x:2, block_y:1,},{block_x:2, block_y:2}]]),

    S: newTetromino([[{block_x:0, block_y:1},{block_x:1, block_y:0},{block_x:2, block_y:0,},{block_x:1, block_y:1}],
                     [{block_x:1, block_y:0},{block_x:2, block_y:2},{block_x:1, block_y:1,},{block_x:2, block_y:1}]]),

    Z: newTetromino([[{block_x:0, block_y:0},{block_x:1, block_y:0},{block_x:2, block_y:1,},{block_x:1, block_y:1}],
                      [{block_x:1, block_y:2},{block_x:2, block_y:0},{block_x:1, block_y:1,},{block_x:2, block_y:1}]]),

    I: newTetromino([
                     [{block_x:0, block_y:0},{block_x:0, block_y:1},{block_x:0, block_y:2},{block_x:0, block_y:3}],
                    [{block_x:-1, block_y:1},{block_x:0, block_y:1},{block_x:1, block_y:1},{block_x:2, block_y:1}]]) //negative to offset the shape from the starting, reminder to limit piece placement])
    
}
