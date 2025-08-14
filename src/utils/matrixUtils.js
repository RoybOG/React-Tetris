import { do_ranges_overlap, find_new_max_key, isNumber, max_null, min_null } from "./utils";


/**
 * I decided to save pixel blocks in a matrix.
 * It's actaucally methodaiclly simular to a 2d array, in both, an x value is linked to all the ys if there's a point at (x,y).
 * In a 2D array, an x value is linked to an array of all y values, and in my matrix an x key is linked to an object with its keys being y values.
 * The advantage of the matrix is it only saves y values that have a point.
 * 
 * This is espacially true in regards to the tetrino pieces.
 * each tetrino is made of just 4 blocks, so instead of saving them with all the empty blocks in a 2D array that surrend them, the matrix only has to save 4 blocks. 
 * This makes colision checking way faster becuase it doesn't have to ignore empty blocks first.
 * 
 */


/**
 * Since redux doenst allow to save non-seriallizable values in a store state, I had to make the comprimize of just saving in the state a plain object with the data, and calling methods from outside the state.
 */

export const MatrixMethods = {
    setBlocks: function(blocks_to_add){

      let new_ys;
      
      if(!Array.isArray(blocks_to_add)){
        blocks_to_add = [blocks_to_add]
      }

      
      for(let block of blocks_to_add){
        
        this.maxX = max_null(this.maxX, block.block_x);
        this.minX = min_null(this.minX, block.block_x);

        this.maxY = max_null(this.maxY, block.block_y);
        this.minY = min_null(this.minY, block.block_y);

        new_ys = (this.blocks?.[block.block_x]) || {};
        new_ys[block.block_y] = block?.color || 0
        this.blocks[block.block_x] = new_ys; 
      }

    },
    removeBlocks: function(blocks_to_remove){
      /*
      Theres no need for me to implement an algorithem to update the min-x, min-y etc... when removing blocks, since it only happens in the static blocks and the max_y will always be 
      the max width since the blocks fall down or one below it if they're about to fall, and every line clear the min y gets incremented. 
      just the min_x and max_y I need to do, which can be done through checking numbers from min_x up to max_x. which is O(n) but fine since line clearing happens once in a while.
      */

      let new_ys;
      
      if(!Array.isArray(blocks_to_remove)){
        blocks_to_remove =  [blocks_to_remove]
      }


      for(let block of blocks_to_remove){
        if(block.block_x in this.blocks){
          delete this.blocks[block.block_x][block.block_y]; 
          if(Object.keys(this.blocks[block.block_x]).length == 0){
            delete this.blocks[block.block_x]
          }
        }
        
      }

     
    },

    /**
     * 
     * @param {*} other 
     * @param {*} offsetToCheck offset of the current matrix if you wish to check collition in a relative position
     * @returns 
     */
    collidesWithMatrixBox: function(other, offsetToCheck){
      
      return do_ranges_overlap(this.minX + offsetToCheck[0], this.maxX + offsetToCheck[0], other.minX , other.maxX  ) &&
            do_ranges_overlap(this.minY  + offsetToCheck[1], this.maxY + offsetToCheck[1], other.minY , other.maxY )
        }

    ,iterateBlocksFromX: function* (x){
            for(let [block_y,color ] of Object.entries(this.blocks[x])){
                  block_x = Number(block_x);
                  block_y= Number(block_y)
                yield ({block_x,block_y,color});
            }
      },

    iterateBlocks:function* (){
        for(let [block_x, ys_in_x ] of Object.entries(this.blocks)){
            
            for(let [block_y,color ] of Object.entries( ys_in_x)){
                  block_x = Number(block_x);
                  block_y= Number(block_y)

                
                
                yield ({block_x,block_y,color});
                
            }
        }
      },

      xValuesFromY:function* (from_a_certain_y=null){
        for(let [block_x, ys_in_x ] of Object.entries(this.blocks)){
            
            for(let [block_y,color ] of Object.entries( ys_in_x)){
                  block_x = Number(block_x);
                  block_y= Number(block_y)

                if(typeof from_a_certain_y === "number" && from_a_certain_y == block_y){
                 yield block_x
                }
                
                
                
            }
        }
      },
      cordInMatrix: function(cordX, cordY){
        return this.blocks?.[cordX]?.[cordY] != null //I have a color that's 0, which its boolean is false. 
         
      },

      

      
      
      
  }

export function collidesWithOther(matrix,other,matrixXOffset=0, matrixYOffset=0){ 
      for(let {block_x,block_y} of MatrixMethods.iterateBlocks.call(matrix)){
        // console.log(`checking (${block_x + x_offset},${block_y + y_offset})` )
            if (MatrixMethods.cordInMatrix.call(other, block_x + matrixXOffset , block_y + matrixYOffset)){
              return true
            }
        }
      
        return false
      
    }

export function combineMatricies(matrix, other){

    MatrixMethods.iterateBlocks.call(this.tetrinoSpriteMatrix )
}

export function newMatrix(blocks_arr=null){
  let matrix = {
    blocks:{
    },
    offset:[0,0],
    maxX:null,
    minX:null,
    maxY:null,
    minY:null
    }
      

  if(blocks_arr){
    MatrixMethods.setBlocks.call(matrix,blocks_arr)
  }

  return matrix;
}


