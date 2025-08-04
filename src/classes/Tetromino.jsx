import { Component } from 'react';
import {  MatrixMethods } from '../utils/matrixUtils';
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

    this.move_down = ()=>{ //excecuting twice every time, check why
      
        this.setState(prevState =>{
          
          this.tetrinoSpriteMatrix.offset = [prevState.Tetromino_x, prevState.Tetromino_y] //updates the offset with x and y value
        
          if(MatrixMethods.collidesWithMatrixBox.call(this.tetrinoSpriteMatrix, this.props.statixBlocksMatrix,[0,1])){ //if future position enters the area of static blocks
            console.log( "coliding")

            //do expensive blocks checking. Its okay the expensive check would be O(n) since it would only happen once the piece is near the static blocks.
            //convert to static block
            return {}
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
    console.log(JSON.stringify(this.rotations))
  }

  get tetrinoSpriteMatrix(){
    return this.rotations[this.state.rotation_index]
  }

    componentDidMount(){
      console.log('mounting')
      
      document.addEventListener('gameClock',this.move_down)
    }

    componentWillUnmount(){
      console.log('Unmounting')
      document.removeEventListener('gameClock',this.move_down) //becuase of strictMode the component will mount and unmount it self and mount again. so this prevents from the class adding two event listeners
    }


    rotate_right(){
        this.setState(prevState =>{rotation_index: (prevState.rotation_index + 1 % this.rotations.length)})
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