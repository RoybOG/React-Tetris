import { Component } from 'react';
import {  collidesWithOther, MatrixMethods } from '../utils/matrixUtils';
import Block from '../components/block';
import { BOARD_BLOCK_HEIGHT } from '../constents';
import { connect } from 'react-redux';

class Tetromino extends Component {
  constructor(props) {
    super(props);
    
    this.rotations = this.props.rotations;
    this.color= this.props.color || 0;

    this.state = {
      counter:0,
      speed: 5,
      Tetromino_x: this.props?.Tetromino_x || 0,
      Tetromino_y: this.props?.Tetromino_y || 0,
      rotation_index:0,
      

    };

    this.handleKeyPress = (keyCode)=>{
      console.log(keyCode)
      switch(keyCode){
        case 'ArrowRight':
          
          this.rotate_right();
          break;
      }
    }

    this.move_down = ()=>{ //excecuting twice every time, check why
      
        this.setState(prevState =>{
          let futureCords =  [prevState.Tetromino_x, prevState.Tetromino_y +1]
          if(MatrixMethods.collidesWithMatrixBox.call(this.tetrinoSpriteMatrix, this.props.statixBlocksMatrix,futureCords)){ //if future position enters the area of static blocks
            
            
            //do expensive blocks checking. Its okay the expensive check would be O(n) since it would only happen once the piece is near the static blocks.
            //convert to static block
            
            if(collidesWithOther(this.tetrinoSpriteMatrix, this.props.statixBlocksMatrix, futureCords[0], futureCords[1])){
              console.log('collided')
              return {}
            }
            console.log( "coliding box")

          }

          if(prevState.Tetromino_y == BOARD_BLOCK_HEIGHT - (this.tetrinoSpriteMatrix.maxY + 1)){ //if reached already bottom of board
            console.log("landed")
            //convert to static block
            return {}
          }
          console.log(`in height ${prevState.Tetromino_y}: moving down`)

          return (
          {
            Tetromino_y: (prevState.Tetromino_y + 1 ),
            // rotation_index: (prevState.rotation_index + 1) % this.rotations.length
          })
      })
      
    }
    /**
     * Handles events the teterino listens to asynchronously.
     * The events are in an switch case to make sure events won't be triggered at the same time.
     * that the piece won't move do down and right at the same time.
     * 
     * @param {*} e  event object with data on it
     */
    this.handleEvents = (e)=>{
      
      switch (e.type) {
        case 'keydown':
         
          if(!e.repeat){
            this.handleKeyPress(e.code)
          }
          break;
        case 'gameClock':
         
          this.move_down()
          break;
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
        
        this.setState(prevState =>{
          
          let newIndex = ((prevState.rotation_index + 1) % this.rotations.length)
          
          if(collidesWithOther(this.rotations[newIndex],this.props.statixBlocksMatrix,prevState.Tetromino_x, prevState.Tetromino_y)){
            // console.log('not allowed')
            return {};
            
          }
          return {rotation_index: newIndex}
          
        })
    }

    


    render(){
        // console.log('rendering Tetromino')
        return (<>{
           Array.from(MatrixMethods.iterateBlocks.call(this.tetrinoSpriteMatrix ),
            ({block_x:relative_x,block_y:relative_y})=>{
              let block_x = relative_x+ this.state.Tetromino_x;
              let block_y = relative_y + this.state.Tetromino_y;
              return (<Block key={`${block_x},${block_y}`} block_x = {block_x} block_y = {block_y} color={this.color}  />)}
           ) 
        }</>)
    }


}

export default connect((state)=>({
  statixBlocksMatrix: state.staticBlocks.board_blocks_matrix
}))(Tetromino)