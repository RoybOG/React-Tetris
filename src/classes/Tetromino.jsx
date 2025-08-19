import { Component } from 'react';
import {  collidesWithOther, MatrixMethods } from '../utils/matrixUtils';
import Block from '../components/block';
import { BOARD_BLOCK_HEIGHT, BOARD_BLOCK_WIDTH, GAMETICKS_TO_NEXT_TETROMINO, gameActions, INITIAL_TETROMINO_HEIGHT, GAMETICKSPEED, INITIAL_TETROMINO_X } from '../constents';
import { connect } from 'react-redux';
import { generateNewTetrino, predictableGen } from '../utils/tetrominoUtils';

class Tetromino extends Component {
  constructor(props) {
    super(props);
    
    //this.color= this.props.color || 0;

    this.state = {
      counter:0,
      speed: 5,
      Tetromino_x: this.props?.Tetromino_x || 0,
      Tetromino_y: this.props?.Tetromino_y || INITIAL_TETROMINO_HEIGHT,
      rotation_index:0,
      color: this.props.color || 0,
      rotations: this.props.rotations,
      numberOfLandedTetrominos:0

      

    };

    


    this.checkValidMove = (x_direction=0, y_direction=0, spriteIndex=this.state.rotation_index)=>{ 
         // console.log(spriteIndex)
          let spriteToCheck = this.state.rotations[spriteIndex]
          let futureCords =  [this.state.Tetromino_x +x_direction, this.state.Tetromino_y +y_direction]
          
          if(futureCords[0]<0 || futureCords[0]+spriteToCheck.maxX >= BOARD_BLOCK_WIDTH){ //If the piece is out of screen horizontal bounds .
            return false;

          }

          if(futureCords[1]<0 || futureCords[1] + spriteToCheck.maxY >= BOARD_BLOCK_HEIGHT){ //If the piece is out of screen vertical bounds . debug.
            return false

          }

          if(this.state.Tetromino_y == BOARD_BLOCK_HEIGHT - (spriteToCheck.maxY + 1)){ //if reached already bottom of board
            
            
            return false;
          }

          if(MatrixMethods.collidesWithMatrixBox.call(spriteToCheck, this.props.staticBlocksMatrix,futureCords)){ //if future position enters the area of static blocks
            
            
            //do expensive blocks checking. Its okay the expensive check would be O(n) since it would only happen once the piece is near the static blocks.
            //convert to static block
            
            if(collidesWithOther(spriteToCheck, this.props.staticBlocksMatrix, futureCords[0], futureCords[1])){ //future movement collides with a static block
              console.log('collided')
              return false
            }
            console.log( "coliding box")
            
          }

         
          
          return true;
      
      
    }  

    /**
     * Moves the Tetrino block, if possible.
     * @param {*} x_direction how many blocks steps to move along the x axis
     * @param {*} y_direction how many blocks steps to move along the y axis
     * @returns true if moved successfully, false if failed due to collition
     */
    this.move = (x_direction=0, y_direction=0)=>{ 
      
      
      if(this.checkValidMove(x_direction, y_direction,)){
       // console.log(`in height ${this.state.Tetromino_y}: moving down`)

        this.setState(prevState =>{
          return (
          {
            Tetromino_x: prevState.Tetromino_x +x_direction,
            Tetromino_y: prevState.Tetromino_y+y_direction,
          })

        })

      
      return true;
      } 
      
      return false;

    
  
  }

    
    /**
     * Checks if during the next time the tetrino will fall one block down, will it land at the bottom or on another tetrino
     * Landing means a block stood in its way or reached the bottom of the screen, so we need to signal the next piece to drop
     * @returns boolean
     */
    this.willLand = ()=>{
      let futureCords =  [this.state.Tetromino_x, this.state.Tetromino_y + 1]

      if(this.state.Tetromino_y == BOARD_BLOCK_HEIGHT - (this.tetrinoSpriteMatrix.maxY + 1)){ //if landed already on the bottom of board
            
            
            return true;
      }

      if(MatrixMethods.collidesWithMatrixBox.call(this.tetrinoSpriteMatrix, this.props.staticBlocksMatrix,futureCords)){ //if future position enters the area of static blocks
            
            
            //do expensive blocks checking. Its okay the expensive check would be O(n) since it would only happen once the piece is near the static blocks.
            //convert to static block
            
            if(collidesWithOther(this.tetrinoSpriteMatrix, this.props.staticBlocksMatrix, futureCords[0], futureCords[1])){ //future movement collides with a static block
              console.log('collided at bottom')
              return true;
            }
            console.log( "fell to coliding box")
            
          }

        
      return false;

    }

    this.fall = ()=>{
      
      if(this.willLand()){
        console.log("landed") 
        this.tetrominoLanded()
      }
      
      else{
      //  console.log(`in height ${this.state.Tetromino_y}: moving down`)

        this.setState(prevState =>{
          return (
          {
            Tetromino_y: prevState.Tetromino_y+1,
          })

        })

      
      return true;
      } 
      
  
    }

    /**
     * Handles events the teterino listens to asynchronously.
     * The events are in an switch case to make sure events won't be triggered at the same time.
     * that the piece won't move do down and right at the same time.
     * 
     * @param {*} e  event object with data on it
     */
    this.handleEvents = (e)=>{
      if(this.tetrinoSpriteMatrix){ //If the Tetrino has a shape, than move it according to keyboard or events
        switch (e.type) {
          case 'keydown':
            if(!e.repeat){
              this.handleKeyPress(e.code)
            }
            break;
          case 'gameClock':
            this.fall()
            break;
        }
      }
    }
  

    this.handleKeyPress = (keyCode)=>{
      //console.log(keyCode)
      switch(keyCode){
        case 'KeyW':
        case 'Enter':
          this.rotate_right();
          break;
        case 'ArrowRight':
        case 'KeyD':
          this.move(1,0)
          break;
        case 'ArrowLeft':
        case 'KeyA':
          this.move(-1,0)
          break;
      }
    }

    console.log(JSON.stringify(this.state.rotations))
  }

  get tetrinoSpriteMatrix(){

    return this.state.rotations[this.state.rotation_index]
  }
  /**
   * since each tetromino is only 4 blocks, checking all of them will actuaclly be faster than any more complicated scheme
   * @param {*} x_offset 
   * @param {*} y_offset 
   * @returns whaether the 
   */
  

    resetTetromino(callbackFunc){
      this.setState((prevState => {
        return {
          Tetromino_y:  INITIAL_TETROMINO_HEIGHT,
          Tetromino_x: INITIAL_TETROMINO_X,
          rotation_index:0, //This to make sure when changing betweeen shapes with different amount of rotations, to allways be on the same rotation and no get out of bounds
          rotations:[]
        }
      }),()=>callbackFunc())
      //clears the tetromino
     

    }


    tetrominoLanded(){
      console.log('working on the next piece')
      this.props.dispatch(gameActions.tetrominoLanded(Array.from(this.getTetrinoBlocks())))
      this.resetTetromino(()=>{
        setTimeout(()=>{
          const {rotations, color} = generateNewTetrino() //predictableGen(this.state.numberOfLandedTetrominos) // generateNewTetrino()
          //replace with new piece

          this.setState((prevState) => {
            return {
              color,
              rotations,
              numberOfLandedTetrominos: prevState.numberOfLandedTetrominos + 1
            }
            
          },()=>{
            console.log(this.tetrinoSpriteMatrix)
          });
       
        
      },GAMETICKS_TO_NEXT_TETROMINO * GAMETICKSPEED )

      });
    }


    componentDidMount(){
      console.log('mounting')
      
      // document.addEventListener('gameClock',this.move_down)
      document.addEventListener('gameClock',this.handleEvents)
      document.addEventListener('keydown',this.handleEvents)
      
    }

    componentWillUnmount(){
      console.log('Unmounting')
      document.removeEventListener('gameClock',this.move_down) //becuase of strictMode the component will mount and unmount it self and mount again. so this prevents from the class adding two event listeners
    }
    
    


    rotate_right(){
        if(this.state.rotations.length <= 1){ //an O tetrino has no rotations, theres no need to check every time since it won't change
            return {}
        }
        let newIndex = ((this.state.rotation_index + 1) % this.state.rotations.length)
        if(this.checkValidMove(0,0,newIndex)){ //If changing just the sprite, without changing position, doesn't collide with anything
            this.setState(prevState =>{
          
          
          
          if(collidesWithOther(this.state.rotations[newIndex],this.props.staticBlocksMatrix,prevState.Tetromino_x, prevState.Tetromino_y)){
            // console.log('not allowed')
            return {};
            
          }
          return {rotation_index: newIndex}
          
        })

        }
        

        
    }

    *getTetrinoBlocks(){
        // console.log('rendering Tetromino')
        if(this.tetrinoSpriteMatrix){ 
          for(const {block_x:relative_x,block_y:relative_y} of MatrixMethods.iterateBlocks.call(this.tetrinoSpriteMatrix )){
          yield {block_x: relative_x + this.state.Tetromino_x,
                 block_y:relative_y + this.state.Tetromino_y,
                 color: this.state.color
                }
        }

        }
           
      
    }


    render(){
        // console.log('rendering Tetromino')
        return (<>{
           Array.from(this.getTetrinoBlocks(),
            ({block_x,block_y,color})=>{
              return (<Block key={`${block_x},${block_y}`} block_x = {block_x} block_y = {block_y} color={this.state.color}  />)}
           ) 
        }</>)
    }


}

export default connect((state)=>({
  staticBlocksMatrix: state.staticBlocks.board_blocks_matrix
}))(Tetromino)