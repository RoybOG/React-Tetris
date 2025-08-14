import { Component } from 'react';
import {  collidesWithOther, MatrixMethods } from '../utils/matrixUtils';
import Block from '../components/block';
import { BOARD_BLOCK_HEIGHT, BOARD_BLOCK_WIDTH, DELAY_TO_NEXT_TETROMINO, gameActions, INITIAL_TETROMINO_HEIGHT } from '../constents';
import { connect } from 'react-redux';
import { generateNewTetrino } from '../utils/tetrominoUtils';

class Tetromino extends Component {
  constructor(props) {
    super(props);
    
    this.rotations = this.props.rotations;
    this.color= this.props.color || 0;

    this.state = {
      counter:0,
      speed: 5,
      Tetromino_x: this.props?.Tetromino_x || 0,
      Tetromino_y: this.props?.Tetromino_y || INITIAL_TETROMINO_HEIGHT,
      rotation_index:0,
      

    };

    this.handleKeyPress = (keyCode)=>{
      console.log(keyCode)
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

    this.fall = ()=>{
      const fellDown = this.move(0,1)
      
      if(!fellDown){ //If failed to move down, it means a block stood in its way or reached the bottom of the screen.
          console.log("landed") 
          this.tetrominoLanded()
      }
    }

    /**
     * Moves the Tetrino block, if possible.
     * @param {*} x_direction how many blocks steps to move along the x axis
     * @param {*} y_direction how many blocks steps to move along the y axis
     * @returns true if moved successfully, false if failed due to collition
     */
    this.move = (x_direction=0, y_direction=0)=>{ 
      
      
      if(this.checkValidMove(x_direction, y_direction,)){
        console.log(`in height ${this.state.Tetromino_y}: moving down`)

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

    this.checkValidMove = (x_direction=0, y_direction=0, spriteIndex=this.state.rotation_index)=>{ 
          console.log(spriteIndex)
          let spriteToCheck = this.rotations[spriteIndex]
          let futureCords =  [this.state.Tetromino_x +x_direction, this.state.Tetromino_y +y_direction]
          
          if(futureCords[0]<0 || futureCords[0]+spriteToCheck.maxX >= BOARD_BLOCK_WIDTH){ //If the piece is out of screen horizontal bounds .
            return false;

          }

          if(futureCords[1]<0 || futureCords[1] + spriteToCheck.maxY >= BOARD_BLOCK_HEIGHT){ //If the piece is out of screen vertical bounds . debug.
            return false

          }

          if(MatrixMethods.collidesWithMatrixBox.call(spriteToCheck, this.props.statixBlocksMatrix,futureCords)){ //if future position enters the area of static blocks
            
            
            //do expensive blocks checking. Its okay the expensive check would be O(n) since it would only happen once the piece is near the static blocks.
            //convert to static block
            
            if(collidesWithOther(spriteToCheck, this.props.statixBlocksMatrix, futureCords[0], futureCords[1])){
              console.log('collided')
              return false
            }
            console.log( "coliding box")
            
          }

          if(this.state.Tetromino_y == BOARD_BLOCK_HEIGHT - (spriteToCheck.maxY + 1)){ //if reached already bottom of board
            
            
            return false;
          }
          
          return true;
      
      
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
    console.log(JSON.stringify(this.rotations))
  }

  get tetrinoSpriteMatrix(){

    return this.rotations[this.state.rotation_index]
  }
  /**
   * since each tetromino is only 4 blocks, checking all of them will actuaclly be faster than any more complicated scheme
   * @param {*} x_offset 
   * @param {*} y_offset 
   * @returns whaether the 
   */
  

    resetTetromino(){
      this.setState((prevState => {
        return {
          Tetromino_y:  INITIAL_TETROMINO_HEIGHT
        }
      }))
      this.rotations = []; //clears the tetromino
      //this.Tetromino_y = INITIAL_TETROMINO_HEIGHT;

    }


    tetrominoLanded(){
      this.props.dispatch(gameActions.tetrominoLanded(Array.from(this.getTetrinoBlocks())))
      this.resetTetromino();
      setTimeout(()=>{
        const {rotations, color} = generateNewTetrino()
        this.rotations = rotations
        this.color = color
        
      },DELAY_TO_NEXT_TETROMINO )
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
        if(this.rotations.length <= 1){ //an O tetrino has no rotations, theres no need to check every time since it won't change
            return {}
        }
        let newIndex = ((this.state.rotation_index + 1) % this.rotations.length)
        if(this.checkValidMove(0,0,newIndex)){ //If changing just the sprite, without changing position, doesn't collide with anything
            this.setState(prevState =>{
          
          
          
          if(collidesWithOther(this.rotations[newIndex],this.props.statixBlocksMatrix,prevState.Tetromino_x, prevState.Tetromino_y)){
            // console.log('not allowed')
            return {};
            
          }
          return {rotation_index: newIndex}
          
        })

        }
        else{
          this.tetrominoLanded()
        }

        
    }

    *getTetrinoBlocks(){
        // console.log('rendering Tetromino')
        if(this.tetrinoSpriteMatrix){ 
          for(const {block_x:relative_x,block_y:relative_y} of MatrixMethods.iterateBlocks.call(this.tetrinoSpriteMatrix )){
          yield {block_x: relative_x + this.state.Tetromino_x,
                 block_y:relative_y + this.state.Tetromino_y,
                 color: this.color
                }
        }

        }
           
      
    }


    render(){
        // console.log('rendering Tetromino')
        return (<>{
           Array.from(this.getTetrinoBlocks(),
            ({block_x,block_y,color})=>{
              return (<Block key={`${block_x},${block_y}`} block_x = {block_x} block_y = {block_y} color={this.color}  />)}
           ) 
        }</>)
    }


}

export default connect((state)=>({
  statixBlocksMatrix: state.staticBlocks.board_blocks_matrix
}))(Tetromino)