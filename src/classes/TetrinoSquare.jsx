import { newMatrix } from "../matrixUtils";
import Tetrino from "./Tetrino";

class TetrinoSquare extends Tetrino {
    static rotations = [newMatrix([{block_x:0, block_y:0},{block_x:1, block_y:0},{block_x:0, block_y:1,},{block_x:1, block_y:1}])]; //reminder to update to object.
    
    constructor(props) {
        super({...props, rotations: TetrinoSquare.rotations});
        console.log('new tetrino!')
        console.log(TetrinoSquare.rotations) 
    }

}

export default TetrinoSquare;