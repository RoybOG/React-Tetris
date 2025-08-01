import { Component } from 'react';
import {  MatrixMethods } from '../matrixUtils';
import Block from '../components/block';
import { BOARD_BLOCK_HEIGHT } from '../constents';

class Tetrino extends Component {
  constructor(props) {
    super(props);
    
    this.rotations = this.props.rotations;
    this.color= this.props.color || 0;

    this.state = {
      counter:0,
      speed: 5,
      tetrino_x: this.props?.tetrino_x || 0,
      tetrino_y: this.props?.tetrino_y || 0,
      rotation_index:0,
      

    };
  }

    componentDidMount(){
      const move_down = ()=>{
      console.log('moving')
      if(this.state.tetrino_y < BOARD_BLOCK_HEIGHT-5){
        this.setState(prevState =>({tetrino_y: (prevState.tetrino_y + 1 )}))
      }
    }
      document.addEventListener('gameClock',move_down)
    }
    rotate_right(){
        this.setState(prevState =>{rotation_index: (prevState.rotation_index + 1 % this.rotations.length)})
    }

    


    render(){
        console.log('rendering tetrino')
        return (<>{
           Array.from(MatrixMethods.iterateBlocks.call( this.rotations[this.state.rotation_index]),
            ({block_x:relative_x,block_y:relative_y})=>{
              let block_x = relative_x+ this.state.tetrino_x;
              let block_y = relative_y + this.state.tetrino_y;
              return (<Block key={`${block_x},${block_y}`} block_x = {block_x} block_y = {block_y} color={this.color}  />)}
           ) 
        }</>)
    }


}

export default Tetrino